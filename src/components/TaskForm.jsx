import { useRef, useState } from 'react';
import Button from './Button';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const titleRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Введите название задачи');
      titleRef.current?.focus();
      return;
    }

    onAdd(title, description);
    setTitle('');
    setDescription('');
    setError('');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    if (error) setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="task-title">Название</label>
        <input
          id="task-title"
          ref={titleRef}
          value={title}
          onChange={handleTitleChange}
          placeholder="Что нужно сделать?"
          autoComplete="off"
          aria-required="true"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'task-title-error' : undefined}
        />
        {error && (
          <p id="task-title-error" className="field__error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="task-description">Описание (необязательно)</label>
        <textarea
          id="task-description"
          rows={2}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div>
        <Button type="submit">Добавить задачу</Button>
      </div>
    </form>
  );
}

export default TaskForm;
