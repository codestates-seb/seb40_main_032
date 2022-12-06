const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    createProxyMiddleware(
      [
        '/login',
        '/accounts',
        '/follows',
        '/boards',
        '/comments',
        '/likes',
        '/image-files',
      ],
      {
        target: process.env.REACT_APP_BACKEND,
        changeOrigin: true,
      },
    ),
  );
};
