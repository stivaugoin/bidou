declare global {
  type Override<T, U> = Omit<T, keyof U> & U;
}

export {};
