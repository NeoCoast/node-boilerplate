/**
 * Enumerator for Winston logging levels,
 * in order of hierarchy:
 * @param ERROR 1
 * @param WARN 2
 * @param INFO 3
 * @param HTTP 4
 * @param VERBOSE 5
 * @param DEBUG 6
 * @param SILLY 7
 */

export default Object.freeze({
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  HTTP: 'http',
  VERBOSE: 'verbose',
  DEBUG: 'debug',
  SILLY: 'silly',
});
