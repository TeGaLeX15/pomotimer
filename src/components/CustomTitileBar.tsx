import './CustomTitleBar.css';
import { FaWindowMinimize, FaWindowMaximize, FaWindowClose } from 'react-icons/fa';

const CustomTitleBar = () => {
  return (
    <div className="custom-title-bar">
      <div className="title-left">
        <span className="app-icon">🍅</span>
        <span className="app-title">Pomodoro Pro</span>
      </div>
      
      <div className="title-right">
        <button className="title-btn" onClick={() => window.electronAPI?.minimizeWindow()}>
          <FaWindowMinimize />
        </button>
        <button className="title-btn" onClick={() => window.electronAPI?.maximizeWindow()}>
          <FaWindowMaximize />
        </button>
        <button className="title-btn close-btn" onClick={() => window.electronAPI?.closeWindow()}>
          <FaWindowClose />
        </button>
      </div>
    </div>
  );
};

export default CustomTitleBar;
