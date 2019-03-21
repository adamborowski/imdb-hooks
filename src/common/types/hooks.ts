export type UseValue<T = string> = () => T | undefined;
export type UseSetValue<T = string> = () => (query?: T) => void;
