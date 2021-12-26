import { main, InputValues } from '../src';
import { setFailed, getInput, setOutput } from '../__mocks__/@actions/core';
import nock from 'nock';
import failCase from '../__fixtures__/scenarios/failed_case.json';
import { CALYPTIA_API_ENDPOINT, CALYPTIA_API_VALIDATION_PATH } from '../src/utils/constants';
import { mockConsole, unMockConsole } from './helpers';
describe('fluent-linter-action', () => {
  let consoleLogMock: jest.Mock;
  const mockedInput = {
    [InputValues.GITHUB_TOKEN]: 'GITHUB_TOKEN',
    [InputValues.CALYPTIA_API_KEY]: 'API_TOKEN',
    [InputValues.CONFIG_LOCATION_GLOB]: '__fixtures__/*.conf',
  };

  process.env.GITHUB_WORKSPACE = __dirname;
  console.log(process.env.GITHUB_WORKSPACE);
  beforeAll(() => {
    getInput.mockImplementation((key: Partial<InputValues>) => {
      return mockedInput[key];
    });

    consoleLogMock = mockConsole('log');
  });

  afterAll(() => {
    unMockConsole('log');
  });

  afterEach(() => {
    getInput.mockClear();
    setFailed.mockClear();
    setOutput.mockClear();
  });

  it('runs when provided the correct input', async () => {
    const client = nock(CALYPTIA_API_ENDPOINT)
      ['post']('/' + CALYPTIA_API_VALIDATION_PATH)
      .reply(200, JSON.stringify({ config: {} }));
    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).reply(200, failCase);

    await main();
    expect(setFailed).toHaveBeenCalled();
    expect(consoleLogMock.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "::add-matcher::problem-matcher.json",
        ],
        Array [
          "<PROJECT_ROOT>/__fixtures__/invalid1.conf:",
          "
      ",
          "0:0 error john   cannot initialize input plugin: john 
      0:0 error syslog Unknown syslog mode abc              
      ",
        ],
        Array [
          "<PROJECT_ROOT>/__fixtures__/invalid1.conf:",
          "
      ",
          "0:0 error parser missing 'key_name' 
      ",
        ],
      ]
    `);
    expect(client.isDone()).toBe(true);
  });
});
