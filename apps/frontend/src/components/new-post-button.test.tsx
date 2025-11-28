import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NewPostButton from "./new-post-button";
import userEvent from "@testing-library/user-event";

describe("NewPostButton", () => {
  it("renders correctly", () => {
    render(<NewPostButton onClick={() => {}} />);
    expect(screen.getByText("New Post")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<NewPostButton onClick={handleClick} />);
    await userEvent.click(screen.getByText("New Post"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
