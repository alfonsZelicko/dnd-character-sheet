import { RestType } from '../features/types';

export type RestEvent = 'short-rest' | 'long-rest' | 'dawn';
export type RestHandler = (event: RestEvent) => void;

const listeners = new Set<RestHandler>();

export const restEventForType = (restType: RestType): RestEvent => {
  switch (restType) {
    case RestType.SR:
      return 'short-rest';
    case RestType.LR:
      return 'long-rest';
    case RestType.DW:
      return 'dawn';
  }
};

export const restTypeForEvent = (event: RestEvent): RestType => {
  switch (event) {
    case 'short-rest':
      return RestType.SR;
    case 'long-rest':
      return RestType.LR;
    case 'dawn':
      return RestType.DW;
  }
};

export const emitRest = (event: RestEvent) => {
  listeners.forEach((listener) => listener(event));
};

export const subscribeToRests = (handler: RestHandler) => {
  listeners.add(handler);
  return () => listeners.delete(handler);
};
