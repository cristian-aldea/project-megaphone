export function debounce(func: () => void, timeout = 300) {
  let timer: number;
  return function (this: unknown, ...args: []) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
