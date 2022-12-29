declare global {
  type Optional<T, K extends keyof T> = Omit<T, K> & Pick<Partial<T>, K>;

  type Override<T, U> = Omit<T, keyof U> & U;
}

export {};
