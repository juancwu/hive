import { useEffect, useState } from 'react';

export default function useRandomId(prefix = '') {
  const [id, setId] = useState('');

  useEffect(() => {
    setId(prefix + Math.random().toString(32).substring(2));
  }, [prefix]);

  return id;
}
