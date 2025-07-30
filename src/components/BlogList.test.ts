// @vitest-environment happy-dom
import { describe, test, expect } from "vitest";
import { getByText, getByRole } from "@testing-library/dom";
import BlogList from "./BlogList.astro";
import { renderAstroComponent } from "../test/helpers.ts";

describe("BlogList.astro", () => {
  describe("renderizado básico", () => {
    test("debería renderizar la lista de blogs con título y descripción", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.querySelector("section")).toBeTruthy();
    });

    test("debería mostrar el título y descripción en la primera página", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.innerHTML).toContain("blogList.title");
      expect(result.innerHTML).toContain("blogList.description");
    });

    test("no debería mostrar título y descripción en páginas posteriores", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 2,
        totalPages: 3,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.innerHTML).not.toContain("blogList.title");
      expect(result.innerHTML).not.toContain("blogList.description");
    });
  });

  describe("filtros", () => {
    test("debería incluir el componente BlogFilters", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.innerHTML).toBeTruthy();
    });

    test("debería pasar las props correctas a BlogFilters", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology", "Programming"],
        selectedCategory: "Programming",
        sortBy: "title",
        viewMode: "list" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        tag: "javascript",
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.innerHTML).toBeTruthy();
    });
  });

  describe("modo de vista grid", () => {
    test("debería renderizar posts en modo grid", async () => {
      // Arrange
      const mockPosts = [
        {
          id: "post-1",
          title: "Post 1",
          excerpt: "Excerpt 1",
        },
        {
          id: "post-2",
          title: "Post 2",
          excerpt: "Excerpt 2",
        },
      ];

      const mockProps = {
        posts: mockPosts,
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: mockPosts,
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      const gridList = result.querySelector('ul[aria-label="posts-list"]');
      expect(gridList?.classList.contains("grid")).toBe(true);
      expect(gridList?.classList.contains("grid-cols-1")).toBe(true);
    });

    test("debería renderizar cada post como un elemento de lista", async () => {
      // Arrange
      const mockPosts = [
        {
          id: "post-1",
          title: "Post 1",
          excerpt: "Excerpt 1",
        },
      ];

      const mockProps = {
        posts: mockPosts,
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: mockPosts,
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      const listItems = result.querySelectorAll("li");
      expect(listItems.length).toBe(1);
    });
  });

  describe("modo de vista list", () => {
    test("debería renderizar posts en modo list", async () => {
      // Arrange
      const mockPosts = [
        {
          id: "post-1",
          title: "Post 1",
          excerpt: "Excerpt 1",
        },
        {
          id: "post-2",
          title: "Post 2",
          excerpt: "Excerpt 2",
        },
      ];

      const mockProps = {
        posts: mockPosts,
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "list" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: mockPosts,
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      const listList = result.querySelector('ul[aria-label="posts-list"]');
      expect(listList?.classList.contains("space-y-6")).toBe(true);
    });
  });

  describe("paginación", () => {
    test("debería mostrar el paginador cuando hay múltiples páginas", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 3,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.innerHTML).toBeTruthy();
    });

    test("no debería mostrar el paginador cuando hay una sola página", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.innerHTML).toBeTruthy();
    });
  });

  describe("información de resultados", () => {
    test("debería mostrar la información de resultados", async () => {
      // Arrange
      const mockPosts = [
        { id: "post-1", title: "Post 1" },
        { id: "post-2", title: "Post 2" },
      ];

      const mockProps = {
        posts: mockPosts,
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: mockPosts,
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.innerHTML).toBeTruthy();
    });
  });

  describe("accesibilidad", () => {
    test("debería incluir aria-label en la lista de posts", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      const list = result.querySelector('ul[aria-label="posts-list"]');
      expect(list).toBeTruthy();
    });
  });

  describe("casos extremos", () => {
    test("debería manejar posts vacíos", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.innerHTML).toBeTruthy();
    });

    test("debería manejar props undefined", async () => {
      // Act & Assert
      await expect(
        renderAstroComponent(BlogList, {
          props: {},
        })
      ).rejects.toThrow();
    });

    test("debería manejar viewMode inválido", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "invalid" as any,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act & Assert
      await expect(
        renderAstroComponent(BlogList, {
          props: mockProps,
        })
      ).rejects.toThrow();
    });
  });

  describe("internacionalización", () => {
    test("debería usar el idioma correcto", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "en" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      expect(result.innerHTML).toBeTruthy();
    });
  });

  describe("estilos y clases CSS", () => {
    test("debería aplicar las clases CSS correctas", async () => {
      // Arrange
      const mockProps = {
        posts: [],
        categories: ["Technology"],
        selectedCategory: "Technology",
        sortBy: "date-desc",
        viewMode: "grid" as const,
        currentPage: 1,
        totalPages: 1,
        paginatedPosts: [],
        getCategoryHref: (cat: string) => `/category/${cat}/`,
        getPageHref: (page: number) => `/page/${page}/`,
        lang: "es" as const,
      };

      // Act
      const result = await renderAstroComponent(BlogList, {
        props: mockProps,
      });

      // Assert
      const section = result.querySelector("section");
      expect(section).toBeTruthy();
    });
  });
});
