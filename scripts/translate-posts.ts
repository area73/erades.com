import fs from "fs";
import path from "path";
import OpenAI from "openai";
import matter from "gray-matter";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function translateText(text: string): Promise<string> {
  const { choices } = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a translator from Spanish to English.",
      },
      { role: "user", content: `Translate this text to English:\n\n${text}` },
    ],
  });
  return choices[0].message.content?.trim() ?? text;
}

async function translatePost(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Traduce solo title y description del frontmatter si existen
  const newData = { ...data };
  if (typeof data.title === "string") {
    newData.title = await translateText(data.title);
  }
  if (typeof data.description === "string") {
    newData.description = await translateText(data.description);
  }

  // Traduce el contenido markdown
  const translatedContent = await translateText(content);

  // Reconstruye el markdown traducido
  const dest = matter.stringify(translatedContent, newData);

  const destPath = filePath.replace("/es/", "/en/");
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, dest);
  console.log(`Traducido: ${filePath} → ${destPath}`);
}

// Recorre todos los posts en es/blog y traduce
async function main() {
  const srcDir = path.join("src", "content", "es", "blog");
  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    if (file.endsWith(".md")) {
      await translatePost(path.join(srcDir, file));
    }
  }
}

main();
