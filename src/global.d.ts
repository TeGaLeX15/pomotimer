export {}

declare global {
  interface Window {
    electronAPI: {
      closeWindow: () => void
      minimizeWindow: () => void
      maximizeWindow: () => void
    },
    process?: {
      type?: 'browser' | 'renderer';
    };
  }
}
