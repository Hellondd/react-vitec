import { Link } from 'react-router-dom';

// Эта страница лежит ВНЕ Layout, поэтому шапки здесь нет.
function NotFoundPage() {
  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <h1>Страница не найдена</h1>
      <p className="lead">Такого адреса в приложении нет.</p>
      <Link to="/">На главную</Link>
    </div>
  );
}

export default NotFoundPage;
