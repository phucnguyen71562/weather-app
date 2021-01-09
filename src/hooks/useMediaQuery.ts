import { useEffect, useState } from 'react';

const useMediaQuery = (query: any): boolean => {
  const mediaQuery: any =
    typeof window !== 'undefined' && window.matchMedia(query);
  const [match, setMatch] = useState(!!mediaQuery.matches);

  useEffect(() => {
    const handler = () => setMatch(!!mediaQuery.matches);
    mediaQuery.addListener(handler);

    return () => mediaQuery.removeListener(handler);
  }, [mediaQuery]);

  return !!match;
};

export default useMediaQuery;
