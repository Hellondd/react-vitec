import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { useTasks } from '../hooks/useTasks';
import { formatDate } from '../utils/formatDate';

function TaskDetailsPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks, toggleTask, deleteTask } = useTasks();

  const task = tasks.find((item) => item.id === taskId);

  const goBack = () => {
    // key === 'default' — это первая страница сессии (открыли ссылку напрямую),
    // назад идти некуда, поэтому ведём в список.
    if (location.key === 'default') {
      navigate('/tasks');
    } else {
      navigate(-1);
    }
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/tasks');
  };

  if (!task) {
    return (
      <>
        <h1>Задача не найдена</h1>
        <p className="lead">Возможно, её удалили, или в ссылке опечатка.</p>
        <Link to="/tasks">← Вернуться к списку задач</Link>
      </>
    );
  }

  return (
    <>
      <div className="back">
        <Button variant="secondary" size="sm" onClick={goBack}>
          ← Назад
        </Button>
      </div>

      <Card className="details">
        <h1 className="details__title">{task.title}</h1>

        <p>
          <span className={`badge${task.done ? ' badge--done' : ''}`}>
            {task.done ? 'Выполнена' : 'В работе'}
          </span>
        </p>

        <p className={task.description ? 'details__desc' : 'details__desc details__desc--empty'}>
          {task.description || 'Описания нет'}
        </p>

        <p className="meta">Создана: {formatDate(task.createdAt)}</p>

        <div className="actions">
          <Button onClick={() => toggleTask(task.id)}>
            {task.done ? 'Вернуть в работу' : 'Отметить выполненной'}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      </Card>
    </>
  );
}

export default TaskDetailsPage;
