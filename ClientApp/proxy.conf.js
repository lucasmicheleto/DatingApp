const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:6199';

const PROXY_CONFIG = [
  {
    context: [
      "/api/users",
      "/api/users/add-photo",
      "/api/users/set-main-photo",
      "/api/account/login",
      "/api/account/register",
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
