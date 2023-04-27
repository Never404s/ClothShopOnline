const httpProxy = require('http-proxy');
const http = require('http');

const servers = [
    { host: 'localhost', port: 8000, connections: 0 },
    { host: 'localhost', port: 8001, connections: 0 },
    { host: 'localhost', port: 8002, connections: 0 },
    { host: 'localhost', port: 8003, connections: 0 },
    // RIP these servers
    // { host: 'localhost', port: 8004, connections: 0 },
    // { host: 'localhost', port: 8005, connections: 0 },
    // { host: 'localhost', port: 8006, connections: 0 },
  ];
  

const proxy = httpProxy.createProxyServer();

//Round Robin approach
// let serverIndex = 0;
// const getServer = () => {
//   const server = servers[serverIndex];
//   serverIndex = (serverIndex + 1) % servers.length;
//   return server;
// };

// const server = http.createServer((req, res) => {
//   const target = getServer();
//   proxy.web(req, res, { target }, (err) => {
//     console.error(`Error proxying request to ${target.host}:${target.port}:`, err);
//     res.status(500).send({ error: { message: 'An error occurred while processing your request.' } });
//   });
// });

//Least connected approach
const getServer = () => {
    const server = servers.reduce((min, server) => (server.connections < min.connections ? server : min));
    server.connections++;
    return server;
  };
  
  const server = http.createServer((req, res) => {
    const target = getServer();
    proxy.web(req, res, { target: `http://${target.host}:${target.port}` }, (err) => {
      console.error(`Error proxying request to ${target.host}:${target.port}:`, err);
      res.status(500).send({ error: { message: 'An error occurred while processing your request.' } });
    });
  });
  
  proxy.on('end', (req, res, target) => {
    target.connections--;
  });

server.listen(8040, () => {
  console.log('Load balancer listening on port 8040');
});