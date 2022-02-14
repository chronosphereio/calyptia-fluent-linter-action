import { main, InputValues } from '../src';
import { setFailed, getInput, setOutput } from '../__mocks__/@actions/core';
import nock from 'nock';
import failCase from '../__fixtures__/scenarios/failed_case.json';
import { CALYPTIA_API_ENDPOINT, CALYPTIA_API_VALIDATION_PATH } from '../src/utils/constants';
import { mockConsole, unMockConsole } from './helpers';
import { problemMatcher } from '../problem-matcher.json';
import { join } from 'path';
describe('fluent-linter-action', () => {
  let consoleLogMock: jest.Mock;
  const mockedInput = {
    [InputValues.CALYPTIA_API_KEY]: 'API_TOKEN',
    [InputValues.CONFIG_LOCATION_GLOB]: '__fixtures__/*.conf',
    [InputValues.FOLLOW_SYMBOLIC_LINKS]: 'false',
  };

  process.env.GITHUB_WORKSPACE = '<PROJECT_ROOT>';
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

  it('Reports missing file with @INCLUDE', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/scenarios/withInclude/wrongPathInclude.conf';
    mockedInput.FOLLOW_SYMBOLIC_LINKS = 'true';

    await main();

    expect(consoleLogMock.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "::add-matcher::<PROJECT_ROOT>/src/problem-matcher.json",
        ],
        Array [
          "<PROJECT_ROOT>/__fixtures__/scenarios/withInclude/wrongPathInclude.conf: 1:1 error LINTER Can not find file tail.conf 
      ",
        ],
      ]
    `);

    expect(setFailed).toHaveBeenCalled();

    const [
      {
        pattern: [{ regexp }],
      },
    ] = problemMatcher;

    const [issues] = consoleLogMock.mock.calls[0] as string[];

    const errors = issues.split('\n');

    // We end up with a last line jump for format that we don't want in the loop.
    errors.pop();

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
        }).toMatchSnapshot(file.replace(join(__dirname, '../'), ''));
      }
    }
  });
  it('Reports no issues with @INCLUDE', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/scenarios/withInclude/include.conf';
    getInput.mockImplementation((key: Partial<Exclude<InputValues, 'FOLLOW_SYMBOLIC_LINKS'>>) => {
      const { FOLLOW_SYMBOLIC_LINKS, ...rest } = mockedInput;
      return rest[key];
    });
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).reply(200, { config: {} });

    await main();

    expect(consoleLogMock).toHaveBeenCalledTimes(1);
    expect(setFailed).not.toHaveBeenCalled();

    expect(client.isDone()).toBe(true);
  });
  it('Reports no issues when configuration has no errors', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).reply(200, { config: {} });

    await main();

    expect(setFailed).not.toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
    expect(client.isDone()).toBe(true);
  });
  it('Reports errors correctly matching problemMatcher', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/invalid.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).reply(200, failCase);
    await main();
    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "We found errors in your configurations. Please check your logs",
        ],
      ]
    `);
    expect(consoleLogMock.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "::add-matcher::<PROJECT_ROOT>/src/problem-matcher.json",
        ],
        Array [
          "<PROJECT_ROOT>/__fixtures__/invalid.conf: 0:0 error LINTER cannot initialize input plugin: john 
      <PROJECT_ROOT>/__fixtures__/invalid.conf: 0:0 error LINTER Unknown syslog mode abc              
      <PROJECT_ROOT>/__fixtures__/invalid.conf: 0:0 error LINTER missing 'key_name'                   
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
        }).toMatchSnapshot(file.replace(join(__dirname, '../'), ''));
      }
    }

    expect(client.isDone()).toBe(true);
  });

  it('Reports errors when request fails', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);

    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).replyWithError(new Error('Server Error'));

    await main();

    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "request to https://cloud-api.calyptia.com/v1/config_validate_v2 failed, reason: Server Error",
        ],
        Array [
          "We found an error, please check, please check your logs",
        ],
      ]
    `);

    expect(consoleLogMock).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            "::add-matcher::<PROJECT_ROOT>/src/problem-matcher.json",
          ],
        ],
        "results": Array [
          Object {
            "type": "return",
            "value": undefined,
          },
        ],
      }
    `);

    expect(client.isDone()).toBe(true);
  });

  it('Reports failure when the CONFIG_LOCATION_GLOB does not provide any results', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/*.nonexistent';

    await main();

    expect(setFailed).toHaveBeenCalled();
    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "We could not find any files from using the provided GLOB (__fixtures__/*.nonexistent)",
        ],
      ]
    `);
  });
  it('Reports errors when request fails with other than 500', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).reply(401, new Error('Auth Error'));

    await main();

    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "The request failed:  status: 401, data: {}",
        ],
      ]
    `);
    expect(consoleLogMock).toHaveBeenCalledTimes(1);

    expect(client.isDone()).toBe(true);
  });

  it('does not report if configuration is not Fluent Bit/Fluentd', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/nginx.conf';

    await main();

    expect(setFailed).not.toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
  });
});
