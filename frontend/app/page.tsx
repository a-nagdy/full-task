import TodoList from "./components/TodoList/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo List</h1>
      <TodoList />
    </main>
  );
}
