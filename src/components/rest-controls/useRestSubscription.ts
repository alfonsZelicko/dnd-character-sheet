import { useEffect } from 'react';
import { subscribeToRests, RestHandler } from './restEvents';
import { RestMode } from './types';

export const useRestSubscription = (mode: RestMode, handler: RestHandler) => {
  useEffect(() => {
    if (mode !== 'global' && mode !== 'global-controls') return;
    const unsubscribe = subscribeToRests(handler);
    return () => {
      unsubscribe();
    };
  }, [handler, mode]);
};
