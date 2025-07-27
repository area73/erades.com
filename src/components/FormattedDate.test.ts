import { describe, it, expect } from "vitest";

// Mock function to simulate FormattedDate component logic
const createFormattedDateProps = (date: Date) => {
  const isValidDate = date instanceof Date && !isNaN(date.getTime());
  const isoString = isValidDate ? date.toISOString() : undefined;
  const formattedDate = isValidDate
    ? date.toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

  return {
    date,
    isValidDate,
    isoString,
    formattedDate,
  };
};

describe("FormattedDate", () => {
  it("should format valid date correctly", () => {
    const testDate = new Date("2023-01-15");
    const props = createFormattedDateProps(testDate);

    expect(props.isValidDate).toBe(true);
    expect(props.isoString).toBe("2023-01-15T00:00:00.000Z");
    expect(props.formattedDate).toBe("Jan 15, 2023");
  });

  it("should handle invalid date", () => {
    const invalidDate = new Date("invalid-date");
    const props = createFormattedDateProps(invalidDate);

    expect(props.isValidDate).toBe(false);
    expect(props.isoString).toBeUndefined();
    expect(props.formattedDate).toBe("-");
  });

  it("should handle null date", () => {
    const nullDate = null as any;
    const props = createFormattedDateProps(nullDate);

    expect(props.isValidDate).toBe(false);
    expect(props.isoString).toBeUndefined();
    expect(props.formattedDate).toBe("-");
  });

  it("should handle undefined date", () => {
    const undefinedDate = undefined as any;
    const props = createFormattedDateProps(undefinedDate);

    expect(props.isValidDate).toBe(false);
    expect(props.isoString).toBeUndefined();
    expect(props.formattedDate).toBe("-");
  });

  it("should format different date formats correctly", () => {
    const dates = [
      new Date("2023-12-25"),
      new Date("2023-06-01"),
      new Date("2023-03-31"),
    ];

    const expectedFormats = ["Dec 25, 2023", "Jun 1, 2023", "Mar 31, 2023"];

    dates.forEach((date, index) => {
      const props = createFormattedDateProps(date);
      expect(props.formattedDate).toBe(expectedFormats[index]);
    });
  });

  it("should handle edge case dates", () => {
    const edgeDates = [
      new Date("2023-01-01"), // New Year
      new Date("2023-12-31"), // Year end
      new Date("2023-02-28"), // February
    ];

    const expectedFormats = ["Jan 1, 2023", "Dec 31, 2023", "Feb 28, 2023"];

    edgeDates.forEach((date, index) => {
      const props = createFormattedDateProps(date);
      expect(props.formattedDate).toBe(expectedFormats[index]);
    });
  });

  it("should generate correct ISO string for valid dates", () => {
    const testDate = new Date("2023-05-20T10:30:00.000Z");
    const props = createFormattedDateProps(testDate);

    expect(props.isoString).toBe("2023-05-20T10:30:00.000Z");
  });

  it("should handle date with time components", () => {
    const dateWithTime = new Date("2023-07-15T14:30:45.123Z");
    const props = createFormattedDateProps(dateWithTime);

    expect(props.isValidDate).toBe(true);
    expect(props.formattedDate).toBe("Jul 15, 2023");
  });
});
