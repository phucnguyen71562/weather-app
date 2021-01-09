import { useRef, useEffect } from 'react';

function useHorizontalScroll() {
  const elRef = useRef(null);

  useEffect(() => {
    const el: any = elRef.current;

    if (el) {
      const onWheel = (e: any) => {
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth',
        });
      };

      el.addEventListener('wheel', onWheel);

      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  return elRef;
}

export default useHorizontalScroll;
