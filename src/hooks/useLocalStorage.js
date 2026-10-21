import { useCallback, useEffect, useRef, useState } from 'react';

// Читаем значение из localStorage. Эту функцию useState вызовет ровно один раз
// (lazy initializer), а не на каждом рендере.
function readValue(key, initialValue) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw !== null) {
      return JSON.parse(raw);
    }
  } catch {
    // Битый JSON или localStorage недоступен — падаем на значение по умолчанию.
  }
  // initialValue можно передать функцией — как в useState.
  // Вызываем её только если в хранилище ничего нет.
  return initialValue instanceof Function ? initialValue() : initialValue;
}

function writeValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Переполнена квота или приватный режим — приложение продолжит жить в памяти.
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readValue(key, initialValue));

  // Актуальное значение «прямо сейчас». Нужно, чтобы несколько setValue(prev => ...)
  // подряд в одном обработчике видели результат друг друга.
  const valueRef = useRef(value);

  // Самый первый запуск: в хранилище пока пусто, а в value уже лежат демо-данные.
  useEffect(() => {
    writeValue(key, valueRef.current);
  }, [key]);

  const setStoredValue = useCallback(
    (next) => {
      const resolved = next instanceof Function ? next(valueRef.current) : next;
      valueRef.current = resolved;

      // Пишем СРАЗУ, а не в useEffect. Если сохранять в эффекте, то при
      // «удалить + navigate» страница размонтируется раньше, чем эффект
      // сработает, — изменение потеряется, а список перечитает старые данные.
      writeValue(key, resolved);
      setValue(resolved);
    },
    [key],
  );

  return [value, setStoredValue];
}
