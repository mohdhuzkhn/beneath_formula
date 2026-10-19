// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, test } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Video } from "../../components/Video";
import Lab from "../../components/Lab";
afterEach(cleanup);
test("player requires a deliberate gesture and can be unloaded", () => {
  const { container } = render(
    <Video id="abcdefghijk" approved title="Mocked lecture" />,
  );
  expect(container.querySelector("iframe")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Load YouTube video" }));
  expect(container.querySelector("iframe")?.src).toContain(
    "youtube-nocookie.com/embed/abcdefghijk",
  );
  fireEvent.click(screen.getByRole("button", { name: "Unload video" }));
  expect(container.querySelector("iframe")).toBeNull();
});
test("unapproved IDs never expose a player", () => {
  render(<Video id="abcdefghijk" title="Unapproved" />);
  expect(
    screen.queryByRole("button", { name: "Load YouTube video" }),
  ).toBeNull();
});
test("lab halves step and resets numerical state", () => {
  render(<Lab />);
  expect(screen.getByRole("status").textContent).toContain("2.5000");
  fireEvent.click(screen.getByRole("button", { name: "Halve the step" }));
  expect(screen.getByRole("status").textContent).toContain("2.2500");
  fireEvent.click(screen.getByRole("button", { name: "Reset experiment" }));
  expect(screen.getByRole("status").textContent).toContain("2.5000");
});
