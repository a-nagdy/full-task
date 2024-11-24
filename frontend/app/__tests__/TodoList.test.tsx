import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList/TodoList";

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe("TodoList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the todo list input", () => {
    render(<TodoList />);
    expect(screen.getByPlaceholderText("Add a new task")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("allows adding a new task", async () => {
    // Mock the second fetch call for adding a task
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "1",
            title: "New Task",
            completed: false,
            createdAt: new Date().toISOString(),
          }),
      })
    );

    render(<TodoList />);

    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    const task = await screen.findByText("New Task");
    expect(task).toBeInTheDocument();
  });
});
