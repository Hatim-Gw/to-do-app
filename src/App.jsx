import { useMemo, useState } from "react";

const emptyTask = {
  name: "",
  finalDate: "",
  state: "in progress",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyTask);

  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.state === "in progress"),
    [tasks],
  );

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.state === "done"),
    [tasks],
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    if (!trimmedName || !form.finalDate) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: crypto.randomUUID(),
        name: trimmedName,
        finalDate: form.finalDate,
        state: form.state,
      },
    ]);

    setForm(emptyTask);
  };

  const updateTaskState = (taskId, nextState) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, state: nextState } : task,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:p-8">
          <div className="mb-8 flex flex-col gap-3">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
              Simple todo app
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Track tasks and move them to completed when they are done.
            </h1>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              Add a task with a name, final date, and state. Tasks marked in
              progress stay in the todo list, and done tasks move into the
              completed section automatically.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Name
              <input
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Write a task"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              Final date
              <input
                type="date"
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                value={form.finalDate}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    finalDate: event.target.value,
                  }))
                }
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
              State
              <select
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                value={form.state}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    state: event.target.value,
                  }))
                }
              >
                <option value="in progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </label>

            <button
              type="submit"
              className="self-end rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            >
              Add task
            </button>
          </form>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <TaskPanel
            title="To do"
            subtitle="Tasks still in progress"
            emptyText="No tasks in progress yet."
            tasks={inProgressTasks}
            actionLabel="Mark done"
            onAction={(taskId) => updateTaskState(taskId, "done")}
          />

          <TaskPanel
            title="Completed"
            subtitle="Tasks that are already finished"
            emptyText="No completed tasks yet."
            tasks={completedTasks}
            actionLabel="Completed"
            onAction={null}
            locked
          />
        </section>
      </div>
    </main>
  );
}

function TaskPanel({
  title,
  subtitle,
  emptyText,
  tasks,
  actionLabel,
  onAction,
  locked = false,
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-cyan-950/20 backdrop-blur">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/60 px-4 py-8 text-center text-sm text-slate-400">
          {emptyText}
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-white">
                    {task.name}
                  </p>
                  <p className="text-sm text-slate-300">
                    Final date: {formatDate(task.finalDate)}
                  </p>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                      task.state === "done"
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-amber-400/15 text-amber-300"
                    }`}
                  >
                    {task.state}
                  </span>
                </div>

                {!locked ? (
                  <button
                    type="button"
                    onClick={() => onAction?.(task.id)}
                    className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    {actionLabel}
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "No date set";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
}

export default App;
