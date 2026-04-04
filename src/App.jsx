import { useMemo, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskPanel from "./components/TaskPanel";

const emptyTask = {
  name: "",
  finalDate: "",
  state: "in progress",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(emptyTask);

  const handleFormChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

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

          <TaskForm
            form={form}
            onFormChange={handleFormChange}
            onSubmit={handleSubmit}
          />
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

export default App;
