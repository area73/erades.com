// Declaración mínima para soportar genéricos en useState y otros hooks
export function useState<S>(
  initialState: S | (() => S)
): [S, (newState: S) => void];
export function useEffect(
  effect: () => void | (() => void),
  deps?: any[]
): void;

// Puedes agregar más hooks si los usas, por ejemplo:
// export function useRef<T>(initialValue: T): { current: T };

export type FC<P = {}> = (props: P) => any;
