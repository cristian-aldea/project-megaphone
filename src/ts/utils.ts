export function throttle(func: () => void, limit = 300) {
  var waiting = false;
  return (...args) => {
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
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
