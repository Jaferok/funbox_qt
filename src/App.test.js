import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("App component", () => {
    render(<App />);
    expect(screen.getByText("Funbox QT")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Поиск...")).toBeInTheDocument();
  });
});
