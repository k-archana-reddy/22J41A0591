import React from 'react';
import { logEvent } from '../utils/logger';

function LoggingComp() {
  const handleClick = async () => {
    await logEvent({
      stack: 'frontend',
      level: 'info',
      package: 'utils',
      message: 'User clicked the button',
    });
  };

  return <button onClick={handleClick}>Click me</button>;
}

export default LoggingComp;
