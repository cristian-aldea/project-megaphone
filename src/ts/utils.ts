export function throttle(func: () => void, limit = 300) {
  var waiting = false;
  return function (this: any, ...args: []) {
    if (!waiting) {
      func.apply(this, args);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}

export function debounce(func: () => void, timeout = 300) {
  let timer: number;
  return function (this: any, ...args: []) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
