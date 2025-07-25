const axios = require('axios');

const validStacks = ['backend', 'frontend'];
const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
const validPackages = {
  backend: ['auth', 'config', 'middleware', 'utils', 'cache', 'controller'],
  frontend: ['auth', 'config', 'middleware', 'utils']
};

const apiUrl = 'http://20.244.56.144/evaluation-service/logs';

async function logMiddleware(req, res, next) {
  const { stack, level, package: pkg, message } = req.body;

  if (!stack || !level || !pkg || !message) {
    console.log('Missing one or more required log fields');
    return res.status(400).json({ message: 'Missing fields' });
  }

  if (stack.match(/[A-Z]/) || level.match(/[A-Z]/) || pkg.match(/[A-Z]/)) {
    return res.status(400).json({ message: 'No uppercase allowed in stack, level, or package' });
  }

  if (!validStacks.includes(stack)) {
    return res.status(400).json({ message: 'Invalid stack' });
  }
  if (!validLevels.includes(level)) {
    return res.status(400).json({ message: 'Invalid level' });
  }
  if (!validPackages[stack].includes(pkg)) {
    return res.status(400).json({ message: 'Invalid package for this stack' });
  }

  console.log(`[LOG] stack: ${stack}, level: ${level}, package: ${pkg}, message: ${message}`);

  try {
    const response = await axios.post(apiUrl, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'API connection error' });
    }
  }
}

module.exports = logMiddleware;
