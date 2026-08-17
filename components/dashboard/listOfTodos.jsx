import { useTodoStores } from '@/stores/todoStores';
import React from 'react'

export default function ListOfTodos({handleEdit}) {

     const { todos, deleteTodos } =
        useTodoStores();
    let safeTodos = todos || [];

  const handleDelete = async (id) => {
    await deleteTodos(id);
  };


  const priorityStyles = {
    low: "bg-slate-100 text-slate-600",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-rose-100 text-rose-700",
  };

  const statusStyles = {
    "Not Completed": "bg-slate-100 text-slate-600",
    Partial: "bg-amber-100 text-amber-700",
    completed: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div>
      <ul className="space-y-2">
            {safeTodos.map((todo) => (
              <li
                key={todo._id}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex-1">
                  <p
                    className={`font-medium text-slate-800 ${todo.completed === "completed" ? "line-through text-slate-400" : ""
                      }`}
                  >
                    {todo.title}
                  </p>
                  <p className="text-sm text-slate-500">{todo.description}</p>
                  <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[todo.priority] || priorityStyles.low
                        }`}
                    >
                      {todo.priority || "low"}
                    </span>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[todo.completed] || statusStyles["Not Completed"]
                        }`}
                    >
                      {todo.completed || "Not Completed"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-sm">

                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(todo)} className="text-slate-500 hover:text-slate-800">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(todo._id)} className="text-rose-500 hover:text-rose-700">
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
    </div>
  )
}
