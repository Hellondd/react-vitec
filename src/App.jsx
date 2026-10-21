import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import TasksPage from './pages/TasksPage';

function App() {
  return (
    <Routes>
      {/* Маршрут без path — только общий каркас. Страницы внутри рисуются в <Outlet /> */}
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
      </Route>

      {/* 404 стоит снаружи Layout — поэтому показывается «в чистом виде», без шапки */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
