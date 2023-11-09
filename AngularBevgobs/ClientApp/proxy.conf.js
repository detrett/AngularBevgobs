const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:8851';

const PROXY_CONFIG = [
  {
    context: [
      "/api",
   ],
    proxyTimeout: 10000,
    target: target,
    secure: false,
    changeOrigin: true,
    headers: {
      Connection: 'keep-alive'
    }
  }
]

module.exports = PROXY_CONFIG;
