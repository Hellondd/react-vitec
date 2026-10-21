import { useSearchParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { useTasks } from '../hooks/useTasks';

const FILTERS = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Выполненные' },
];

const FILTER_PREDICATES = {
  all: () => true,
  active: (task) => !task.done,
  done: (task) => task.done,
};

function TasksPage() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  // Фильтр живёт в адресной строке (?filter=active). Мусорное значение считаем «Все».
  const rawFilter = searchParams.get('filter');
  const filter = FILTERS.some((item) => item.value === rawFilter) ? rawFilter : 'all';

  const setFilter = (value) => {
    // Для «Все» параметр убираем — адрес остаётся чистым: /tasks
    setSearchParams(value === 'all' ? {} : { filter: value }, { replace: true });
  };

  const visibleTasks = tasks.filter(FILTER_PREDICATES[filter]);

  const handleAdd = (title, description) => {
    addTask(title, description);
    // Новая задача активная — в «Выполненных» её не видно, поэтому возвращаем «Все».
    if (filter === 'done') setFilter('all');
  };

  const handleDelete = (task) => {
    if (window.confirm(`Удалить задачу «${task.title}»?`)) {
      deleteTask(task.id);
    }
  };

  return (
    <>
      <h1>Задачи</h1>

      <TaskForm onAdd={handleAdd} />

      <div className="filters" role="group" aria-label="Фильтр задач">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`chip${filter === value ? ' chip--active' : ''}`}
            aria-pressed={filter === value}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <p className="empty">Пусто</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TasksPage;
