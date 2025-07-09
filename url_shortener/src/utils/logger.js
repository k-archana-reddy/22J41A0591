import axios from 'axios';

const validStacks = ['backend', 'frontend'];
const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
const validPackages = {
  backend: ['auth', 'config', 'middleware', 'utils', 'cache', 'controller'],
  frontend: ['auth', 'config', 'middleware', 'utils']
};

const apiUrl = 'http://20.244.56.144/evaluation-service/logs';

export async function logEvent({ stack, level, package: pkg, message }) {
  if (!stack || !level || !pkg || !message) {
    console.error('Missing one or more required log fields');
    return;
  }
  if (/[A-Z]/.test(stack) || /[A-Z]/.test(level) || /[A-Z]/.test(pkg)) {
    console.error('No uppercase allowed in stack, level, or package');
    return;
  }
  if (!validStacks.includes(stack)) {
    console.error('Invalid stack');
    return;
  }
  if (!validLevels.includes(level)) {
    console.error('Invalid level');
    return;
  }
  if (!validPackages[stack].includes(pkg)) {
    console.error('Invalid package for this stack');
    return;
  }

  console.log(`[LOG] stack: ${stack}, level: ${level}, package: ${pkg}, message: ${message}`);

  try {
    const response = await axios.post(apiUrl, { stack, level, package: pkg, message });
    return response.data;
  } catch (error) {
    console.error('Failed to send log to API:', error);
  }
}
