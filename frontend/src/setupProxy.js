const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://16.170.206.226:3000', 
      changeOrigin: true,
    })
  );
};
