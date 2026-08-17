"use client";

import { useEffect, useState } from "react";
import { useTodoStores } from "@/stores/todoStores";
import { useAuthStore } from "@/stores/authStores";
import { useRouter } from "next/navigation";
import ListOfTodos from "@/components/dashboard/listOfTodos";

const COMPLETION_STATUSES = ["Not Completed", "Partial", "completed"];

export default function Dashboard() {
  const { todos, isLoading, error, getTodos, createTodos, updateTodos } = useTodoStores();

  let safeTodos = todos || [];
  const { isLoggedIn, hasHydrated, } = useAuthStore();
  const router = useRouter();
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    completed: "Not Completed",
  });

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [hasHydrated, isLoggedIn, router]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const resetForm = () => {
    setForm({ title: "", description: "", priority: "low", completed: "Not Completed" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateTodos({ ...form, id: editingId });
    } else {
      await createTodos({ ...form });
    }
    getTodos();
    resetForm();
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority || "low",
      completed: todo.completed || "Not Completed",
    });
  };

  if (!hasHydrated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />
          <p className="text-sm text-slate-400">Loading…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">

      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold text-slate-800 mb-6">My Todos</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 space-y-3"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            rows={2}
            required
          />
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="low">Priority Low</option>
              <option value="medium">Priority Medium</option>
              <option value="high">Priority High</option>
            </select>
            <select
              value={form.completed}
              onChange={(e) => setForm({ ...form, completed: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {COMPLETION_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isLoading}
              className="ml-auto rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {editingId ? "Update task" : "Add task"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg px-3 py-2 text-sm text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {error && (
          <p className="mb-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">{error}</p>
        )}

        {isLoading && safeTodos.length === 0 ? (
          <p className="text-sm text-slate-400">Loading tasks…</p>
        ) : safeTodos.length === 0 ? (

          <p className="text-sm text-slate-400">No tasks yet. Add one above.</p>
        ) : (
          <ListOfTodos handleEdit={handleEdit} />
        )}
      </div>
    </main>
  );
}