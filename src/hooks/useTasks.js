import { useLocalStorage } from './useLocalStorage';

export const STORAGE_KEY = 'tasks-app:v1';

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

// Три демо-задачи для самого первого запуска (когда в localStorage пусто).
function createDemoTasks() {
  const now = Date.now();

  return [
    {
      id: crypto.randomUUID(),
      title: 'Разобраться с React Router',
      description: 'Вложенные маршруты, Outlet, NavLink, useParams и useSearchParams.',
      done: false,
      createdAt: new Date(now - 2 * DAY).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Написать хук useLocalStorage',
      description: 'Ленивая инициализация и запись в localStorage при каждом изменении.',
      done: true,
      createdAt: new Date(now - DAY).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: 'Поиграть с фильтром',
      description: 'Нажми «Активные» или «Выполненные» и посмотри, как меняется адрес страницы.',
      done: false,
      createdAt: new Date(now - HOUR).toISOString(),
    },
  ];
}

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, createDemoTasks);

  const addTask = (title, description = '') => {
    // id и дату создаём снаружи updater-функции, чтобы она оставалась чистой.
    const task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [task, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
}
