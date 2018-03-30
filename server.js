// setup next js to use custom routing
// This is from the example of  'next-routes' lib
const next = require('next');
const routes = require('./routes');

// Create next.js app and specify environment; Setup handler
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);

// Initialize server without express
const { createServer } = require('http');
app.prepare().then(() => createServer(handler).listen(3000));
