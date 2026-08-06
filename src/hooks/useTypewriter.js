import { useEffect, useState } from 'react';
import useReducedMotion from './useReducedMotion';

export default function useTypewriter(words, speed = 70, pause = 1600) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(() => (reduced ? words[0] || '' : ''));
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const word = words[index % words.length];
    let timer;
    if (!deleting && text === word) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => i + 1);
      }, 200);
    } else {
      timer = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        speed,
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, speed, pause, reduced]);

  return text;
}