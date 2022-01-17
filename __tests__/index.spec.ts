import { main, InputValues } from '../src';
import { setFailed, getInput, setOutput } from '../__mocks__/@actions/core';
import nock from 'nock';

import failCaseFluentBit from '../__fixtures__/scenarios/failed_case_fluent_bit.json';
import failCaseFluentD from '../__fixtures__/scenarios/failed_case_fluent_d.json';
import { CALYPTIA_API_ENDPOINT } from '../src/utils/constants';
import { mockConsole, unMockConsole, urlByAgentType } from './helpers';
import { problemMatcher } from '../problem-matcher.json';
import { join } from 'path';

describe('fluent-linter-action', () => {
  let consoleLogMock: jest.Mock;
  const mockedInput = {
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

  it('Reports no issues when configuration has no errors', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + urlByAgentType('FLUENT_BIT')).reply(200, { config: {} });

    await main();

    expect(setFailed).not.toHaveBeenCalled();
    expect(consoleLogMock).not.toHaveBeenCalled();
  });

  it('Reports errors correctly matching problemMatcher', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/invalid.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + urlByAgentType('FLUENT_BIT')).reply(200, failCaseFluentBit);

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
        }).toMatchSnapshot(file.replace(join(__dirname, '../'), ''));
      }
    }

    expect(client.isDone()).toBe(true);
  });

  it('Reports errors when request fails', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);

    client['post']('/' + urlByAgentType('FLUENT_BIT')).replyWithError(new Error('Server Error'));

    await main();

    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "something went very wrong \\"request to https://cloud-api.calyptia.com/v1/config_validate/fluentbit failed, reason: Server Error\\"",
        ],
      ]
    `);

    expect(consoleLogMock).not.toHaveBeenCalled();

    expect(client.isDone()).toBe(true);
  });

  it('Reports errors when request fails with other than 500', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + urlByAgentType('FLUENT_BIT')).reply(401, new Error('Auth Error'));

    await main();

    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "The request failed:  status: 401, data: {}",
        ],
      ]
    `);
    expect(consoleLogMock).not.toHaveBeenCalled();

    expect(client.isDone()).toBe(true);
  });

  it('does not report if configuration is not fluent-bit/fluentd', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/nginx.conf';

    await main();

    expect(setFailed).not.toHaveBeenCalled();
    expect(consoleLogMock).not.toHaveBeenCalled();
  });

  it('Reports errors when request fails with other than 500', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + urlByAgentType('FLUENT_BIT')).reply(401, new Error('Auth Error'));

    await main();

    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "The request failed:  status: 401, data: {}",
        ],
      ]
    `);
    expect(consoleLogMock.mock.calls).toMatchInlineSnapshot('Array []');

    expect(client.isDone()).toBe(true);
  });

  it('Reports errors correctly matching problemMatcher on a fluentD file', async () => {
    mockedInput.CONFIG_LOCATION_GLOB = '__fixtures__/fluentD_with_issues.conf';

    const client = nock(CALYPTIA_API_ENDPOINT);

    client['post']('/' + urlByAgentType('FLUENT_D')).reply(200, failCaseFluentD);

    await main();

    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
          Array [
            Array [
              "We found errors in your configurations. Please check your logs",
            ],
          ]
      `);
    const matcherLog = consoleLogMock.mock.calls[0][0];

    expect(matcherLog).toMatchInlineSnapshot('"::add-matcher::<PROJECT_ROOT>/src/problem-matcher.json"');

    const linterLines = consoleLogMock.mock.calls[1];

    const [
      {
        pattern: [{ regexp }],
      },
    ] = problemMatcher;

    const [issues] = linterLines as string[];

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
});
