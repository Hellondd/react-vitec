import { Link } from 'react-router-dom';
import Button from './Button';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task${task.done ? ' task--done' : ''}`}>
      {/* Чекбокс вне Link — клик по нему переключает done и не уводит в детали */}
      <input
        type="checkbox"
        className="task__check"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={`Выполнено: ${task.title}`}
      />

      <Link to={`/tasks/${task.id}`} className="task__body">
        <span className="task__title">{task.title}</span>
        {task.description && <span className="task__desc">{task.description}</span>}
      </Link>

      <Button variant="danger" size="sm" onClick={() => onDelete(task)}>
        Удалить
      </Button>
    </li>
  );
}

export default TaskItem;
