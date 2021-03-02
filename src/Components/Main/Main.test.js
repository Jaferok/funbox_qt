import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Main from "./index";

describe("Main", () => {
  test("search bar", async () => {
    render(<Main />);
    const searchInput = screen.getByPlaceholderText("Поиск...");

    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchInput);
    expect(searchInput).toHaveFocus();

    userEvent.type(searchInput, "Тест");
    expect(searchInput.value).toEqual("Тест");

    const searchResults = await screen.findAllByText(/Тест/);
    expect(searchResults).toHaveLength(10);
    userEvent.click(searchResults[0]);

    const deleteButton = screen.getByText("trash.svg");
    userEvent.click(deleteButton);
    expect(screen.queryByText(/Тест/)).toBeNull();

    userEvent.click(searchInput);
    expect(screen.queryAllByRole("menuitem")).not.toBe(null);

    async function getMenuItems() {
      return screen.findAllByRole("menuitem");
    }

    let menuItems;
    userEvent.type(searchInput, "Тест");
    menuItems = await getMenuItems();
    expect(menuItems).toHaveLength(10);
    userEvent.type(menuItems[0], "{enter}");
    expect(screen.queryAllByText(/Тест/)).toHaveLength(1);

    userEvent.click(searchInput);
    menuItems = await getMenuItems();
    expect(menuItems).toHaveLength(10);
    userEvent.type(menuItems[0], "{enter}");
    expect(screen.queryAllByText(/Тест/)).toHaveLength(1);
  });

  test("arrow navigation", async () => {
    render(<Main />);
    const searchInput = screen.getByPlaceholderText("Поиск...");

    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchInput);
    expect(searchInput).toHaveFocus();

    userEvent.type(searchInput, "Тест");
    expect(searchInput.value).toEqual("Тест");

    const searchResults = await screen.findAllByText(/Тест/);
    expect(searchResults).toHaveLength(10);

    for (let i = 0; i < 12; i++) {
      userEvent.type(searchInput, "{arrowdown}");
    }
    for (let i = 0; i < 12; i++) {
      userEvent.type(searchInput, "{arrowup}");
    }

    userEvent.type(searchInput, "{arrowdown}");
    userEvent.type(searchInput, "{arrowdown}");
    userEvent.type(searchResults[1], "{enter}");
    expect(screen.queryByRole("menuitem")).toBe(null);
    expect(screen.getByText(/Тест/)).toBeInTheDocument();
  });

  test("select item by press enter without selecting", async () => {
    render(<Main />);
    const searchInput = screen.getByPlaceholderText("Поиск...");
    userEvent.click(searchInput);
    userEvent.type(searchInput, "Тест");

    const searchResults = await screen.findAllByText(/Тест/);
    expect(searchResults).toHaveLength(10);
    userEvent.type(searchInput, "{enter}");
  });

  test("hover test", async () => {
    render(<Main />);
    const searchInput = screen.getByPlaceholderText("Поиск...");
    userEvent.click(searchInput);
    userEvent.type(searchInput, "Тест");

    const searchResults = await screen.findAllByText(/Тест/);
    expect(searchResults).toHaveLength(10);
    userEvent.hover(searchResults[0]);
    userEvent.unhover(searchResults[1]);
  });

  test("search bar errors", async () => {
    render(<Main />);
    const searchInput = screen.getByPlaceholderText("Поиск...");

    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchInput);
    expect(searchInput).toHaveFocus();

    userEvent.type(searchInput, "te");
    expect(searchInput.value).toEqual("te");

    expect(
      await screen.findByText("Для поиска введите 3 и более символов")
    ).toBeInTheDocument();

    userEvent.clear(searchInput);
    expect(searchInput.value).toEqual("");

    userEvent.type(searchInput, "teeeeeeeeeeeeeee");
    expect(searchInput.value).toEqual("teeeeeeeeeeeeeee");

    expect(
      await screen.findByText("По вашему запросу ничего не найдено")
    ).toBeInTheDocument();
  });
});
