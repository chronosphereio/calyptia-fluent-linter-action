import { AGENT_TYPE, CALYPTIA_API_VALIDATION_PATH } from '../src/utils/constants';

type Response = (...args: unknown[]) => unknown;

const ORIGINALS = {
  log: global.console.log,
  error: global.console.error,
};

const defaultResponse = (): undefined => undefined;
export const createHandler = (response: Response = defaultResponse): jest.Mock => {
  return jest.fn(response);
};
type METHODS = 'log' | 'error';
export const mockConsole = (method: METHODS): jest.Mock => {
  const handler = jest.fn();
  global.console[method] = handler;
  return handler;
};
export const unMockConsole = (method: METHODS): void => {
  global.console[method] = ORIGINALS[method];
};

export const urlByAgentType = (agentType: keyof typeof AGENT_TYPE): string => {
  return [CALYPTIA_API_VALIDATION_PATH, AGENT_TYPE[agentType]].join('/');
};
