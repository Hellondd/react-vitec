import { Link, NavLink, Outlet } from 'react-router-dom';

// Общий каркас: шапка + место, куда роутер подставляет вложенную страницу.
function Layout() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">
            Мои задачи
          </Link>
          <nav className="nav" aria-label="Основная навигация">
            {/* end — чтобы «Главная» не горела активной на всех страницах */}
            <NavLink to="/" end>
              Главная
            </NavLink>
            <NavLink to="/tasks">Задачи</NavLink>
          </nav>
        </div>
      </header>

      <main className="container page">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
