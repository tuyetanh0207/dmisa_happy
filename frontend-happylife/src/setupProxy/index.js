// // src/setupProxy/index.js
// import  createProxyMiddleware from 'http-proxy-middleware'

// export default function CORS (app) {
//   app.use(
//     '/api/v1/registrations/update',
//     createProxyMiddleware({
//       target: 'http://localhost:8090',
//       changeOrigin: true,
//       pathRewrite: { [`^/api/v1/registrations/update`]: '' },
//     })
//   );
// }
