import Winston from 'winston';
import LEVELS from './enums/logging_levels';

const { DEBUG, INFO } = LEVELS;
const {
  createLogger, format: {
    combine,
    timestamp,
    colorize,
    splat,
    printf,
  }, transports: { Console, File },
} = Winston;

const LOGGING_LEVEL = process.env.NODE_ENV === 'production' ? INFO : DEBUG;

const format = printf(({
  level,
  message,
  timestamp: timeStamp,
}) => `${timeStamp} [${level}] : ${message}`);

const transports = [
  new Console({ level: INFO }),
];

// if (process.env.LOG_TO_FILE) transports.push(new File({ filename: 'server.log', level: DEBUG }));

export default createLogger({
  level: LOGGING_LEVEL,
  format: combine(
    timestamp(),
    splat(),
    colorize(),
    format,
  ),
  transports,
});
