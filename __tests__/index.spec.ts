import { main, InputValues } from '../src';
import { setFailed, getInput, setOutput } from '../__mocks__/@actions/core';
import nock from 'nock';
import failCase from '../__fixtures__/scenarios/failed_case.json';
import { CALYPTIA_API_ENDPOINT, CALYPTIA_API_VALIDATION_PATH } from '../src/utils/constants';
import { mockConsole, unMockConsole } from './helpers';
import { problemMatcher } from '../.github/problem-matcher.json';
describe('fluent-linter-action', () => {
  let consoleLogMock: jest.Mock;
  const mockedInput = {
    [InputValues.GITHUB_TOKEN]: 'GITHUB_TOKEN',
    [InputValues.CALYPTIA_API_KEY]: 'API_TOKEN',
    [InputValues.CONFIG_LOCATION_GLOB]: '__fixtures__/*.conf',
  };

  process.env.GITHUB_WORKSPACE = __dirname;
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
    consoleLogMock.mockClear();
  });

  it('runs when provided the correct input: 1 correct, 1 with errors, the last one fails with server error', async () => {
    const client = nock(CALYPTIA_API_ENDPOINT)
      ['post']('/' + CALYPTIA_API_VALIDATION_PATH)
      .reply(200, JSON.stringify({ config: {} }));
    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).reply(200, failCase);

    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).replyWithError(new Error('Server Error'));

    await main();
    // expect(setFailed).toHaveBeenCalled();
    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "something went very wrong \\"request to https://cloud-api.calyptia.com/v1/config_validate/fluentbit failed, reason: Server Error\\"",
        ],
        Array [
          "We found errors in your configurations. Please check your logs",
        ],
      ]
    `);
    expect(consoleLogMock.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "::add-matcher::.github/problem-matcher.json",
        ],
        Array [
          "<PROJECT_ROOT>/__fixtures__/invalid.conf: 0:0 error john   cannot initialize input plugin: john 
      <PROJECT_ROOT>/__fixtures__/invalid.conf: 0:0 error syslog Unknown syslog mode abc              
      <PROJECT_ROOT>/__fixtures__/invalid.conf: 0:0 error parser missing 'key_name'                   
      ",
        ],
      ]
    `);
    const [
      {
        pattern: [{ regexp }],
      },
    ] = problemMatcher;

    const [issues] = consoleLogMock.mock.calls[1] as string[];

    const errors = issues.split('\n');

    errors.pop(); // We end up with a last line jump for format that we don't want in the loop.

    for (const error of errors) {
      const issue = error.match(new RegExp(regexp));

      if (issue) {
        const [, file, line, column, severity, , message] = issue;

        expect({
          file,
          line,
          column,
          severity,
          message,
        }).toMatchSnapshot(`${error}`);
      }
    }

    expect(client.isDone()).toBe(true);
  });
});
