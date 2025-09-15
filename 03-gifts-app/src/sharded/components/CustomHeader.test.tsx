import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  const title = "Test title";
  const description = "Test description";

  test("Should render title correctly", async () => {
    render(<CustomHeader title={title} />);

    expect(screen.getByText(title)).toBeDefined();
  });

  test("Should render description provided", () => {
    render(<CustomHeader title={title} description={description} />);

    expect(screen.getByText(description)).toBeDefined();
  });

  test("Should not render description when not provided", () => {
    const title = "Test title";

    const { container } = render(<CustomHeader title={title} />);
    const desc = container.querySelector("p");

    expect(desc).toBeNull();
  });
});
