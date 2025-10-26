// src/utils/isElectron.ts
export const isElectron = () => {
  // В браузере window.process будет undefined
  return Boolean(window && window.process && window.process.type);
};
