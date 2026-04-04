function TaskForm({ form, onFormChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
        Name
        <input
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          value={form.name}
          onChange={(event) => onFormChange("name", event.target.value)}
          placeholder="Write a task"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
        Final date
        <input
          type="date"
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          value={form.finalDate}
          onChange={(event) => onFormChange("finalDate", event.target.value)}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm font-medium text-slate-200">
        State
        <select
          className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          value={form.state}
          onChange={(event) => onFormChange("state", event.target.value)}
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
  );
}

export default TaskForm;
