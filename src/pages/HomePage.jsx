import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { useTasks } from '../hooks/useTasks';

function HomePage() {
  const navigate = useNavigate();
  const { tasks } = useTasks();

  const total = tasks.length;
  const done = tasks.filter((task) => task.done).length;
  const active = total - done;

  return (
    <>
      <h1>Привет!</h1>
      <p className="lead">Вот как идут дела с задачами.</p>

      <div className="stats">
        <Card title="Всего задач">
          <p className="stat__value">{total}</p>
        </Card>
        <Card title="Выполнено">
          <p className="stat__value">{done}</p>
        </Card>
        <Card title="Активно">
          <p className="stat__value">{active}</p>
        </Card>
      </div>

      <Button onClick={() => navigate('/tasks')}>Перейти к задачам</Button>
    </>
  );
}

export default HomePage;
