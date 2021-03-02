import React from "react";
import { render, screen } from "@testing-library/react";

import Header from "./index";

describe("Header", () => {
  test("check text of Header component", () => {
    render(<Header />);
    expect(screen.getByText("Funbox QT")).toBeInTheDocument();
  });
});
