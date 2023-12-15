#!/usr/bin/env node

import 'dotenv/config';
import http from 'http';
import logger from '@services/logger';
import app from '@server';

const port: number = Number(process.env.PORT) || 8080;

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
  logger.info(`Listening on Port: ${port}`);
  logger.info('AdminBro is running at /admin');
});

server.on('error', (err: NodeJS.ErrnoException) => {
  logger.error(err.stack);
  process.exit(1);
});

process.once('SIGTERM', () => {
  logger.info('SIGTERM received. Terminating');
  server.close(() => {
    process.exit(0);

  });
});

process.on('uncaughtException', (err: Error) => {
  logger.error(err.stack);
});

process.on('unhandledRejection', (err: any) => {
  logger.error(err.stack);
});
