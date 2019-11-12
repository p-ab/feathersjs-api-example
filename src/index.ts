import logger from './logger';
import app from './app';
import cluster from 'cluster';
import * as os from 'os';

const numberOfCores = os.cpus().length;
 
if (cluster.isMaster) {
  console.log(`Master ${process.pid} started`);
  for (let i = 0; i < numberOfCores; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} stopped working`);
    cluster.fork();
  });
  cluster.on('fork', (worker) => {
    console.log(`Worker ${worker.process.pid} started`);
  });
} else {
  const hostname = app.get('host');
  const port = app.get('port');
  const server = app.listen(port, hostname);

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', hostname, port)
  );
}
