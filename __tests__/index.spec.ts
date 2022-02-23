import { main, INPUT } from '../src';
import { setFailed, getInput, setOutput } from '../__mocks__/@actions/core';
import nock from 'nock';
import failCase from '../__fixtures__/scenarios/failed_case.json';
import { CALYPTIA_API_ENDPOINT, CALYPTIA_API_VALIDATION_PATH } from '../src/utils/constants';
import { mockConsole, unMockConsole } from './helpers';
import { problemMatcher } from '../problem-matcher.json';
import { join, resolve } from 'path';
import { FluentBitSchema } from '@calyptia/fluent-bit-config-parser';
const getTokensBySectionIdMock = jest.fn(() => [
  {
    col: 5,
    line: 2,
  },
]);

jest.spyOn(FluentBitSchema.prototype, 'getTokensBySectionId');
describe('fluent-linter-action', () => {
  let consoleLogMock: jest.Mock;
  const mockedInput = {
    [INPUT.CALYPTIA_API_KEY]: 'API_TOKEN',
    [INPUT.CONFIG_LOCATION_GLOB]: '__fixtures__/*.conf',
    [INPUT.FOLLOW_SYMBOLIC_LINKS]: 'false',
  };

  process.env.GITHUB_WORKSPACE = resolve(__dirname, '../');
  beforeAll(() => {
    getInput.mockImplementation((key: Partial<INPUT>) => {
      return mockedInput[key];
    });

    consoleLogMock = mockConsole('log');
  });

  afterAll(() => {
    unMockConsole('log');
    jest.restoreAllMocks();
  });

  afterEach(() => {
    getInput.mockClear();
    setFailed.mockClear();
    setOutput.mockClear();
    consoleLogMock.mockClear();
  });

  it('Reports missing file with @INCLUDE', async () => {
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/scenarios/withInclude/wrongPathInclude.conf';
    mockedInput[INPUT.FOLLOW_SYMBOLIC_LINKS] = 'true';

    await main();

    expect(consoleLogMock.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "::add-matcher::<PROJECT_ROOT>/src/problem-matcher.json",
        ],
        Array [
          "./__fixtures__/scenarios/withInclude/wrongPathInclude.conf: 1:1 error LINTER Can not find file tail.conf 
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
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/scenarios/withInclude/include.conf';
    getInput.mockImplementation((key: Exclude<`${INPUT}`, `${INPUT.FOLLOW_SYMBOLIC_LINKS}`>) => {
      const { [INPUT.FOLLOW_SYMBOLIC_LINKS]: FOLLOW_SYMBOLIC_LINKS, ...rest } = mockedInput;
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
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).reply(200, { config: {} });

    await main();

    expect(setFailed).not.toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
    expect(client.isDone()).toBe(true);
  });

  it('Reports errors correctly matching problemMatcher', async () => {
    jest.spyOn(FluentBitSchema.prototype, 'getTokensBySectionId').mockImplementationOnce(getTokensBySectionIdMock);
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/invalid.conf';
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
          "./__fixtures__/invalid.conf: 2:5 error LINTER cannot initialize input plugin: john 
      ./__fixtures__/invalid.conf: 0:0 error LINTER Unknown syslog mode abc              
      ./__fixtures__/invalid.conf: 0:0 error LINTER missing 'key_name'                   
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

    expect(getTokensBySectionIdMock).toHaveBeenCalled();
    expect(client.isDone()).toBe(true);
  });
  it('Reports errors correctly and excludes runtime errors', async () => {
    jest.spyOn(FluentBitSchema.prototype, 'getTokensBySectionId').mockImplementationOnce(getTokensBySectionIdMock);
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/invalid.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    const failCaseWithListenError = {
      errors: {
        ...failCase.errors,
        runtime: [
          {
            id: '47b5f893-b617-498f-a644-09bbdf88f014',
            errors: ['Error binding socket'],
          },
        ],
      },
    };
    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).reply(200, failCaseWithListenError);
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
          "./__fixtures__/invalid.conf: 2:5 error LINTER Unknown syslog mode abc 
      ./__fixtures__/invalid.conf: 0:0 error LINTER missing 'key_name'      
      ",
        ],
      ]
    `);
    expect(client.isDone()).toBe(true);
  });

  it('Reports errors when request fails', async () => {
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);

    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).replyWithError(new Error('Server Error'));

    await main();

    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "request to https://cloud-api.calyptia.com/v1/config_validate_v2 failed, reason: Server Error",
        ],
        Array [
          "We found an error. Please check your logs",
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
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/*.nonexistent';

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
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/basic.conf';
    const client = nock(CALYPTIA_API_ENDPOINT);
    client['post']('/' + CALYPTIA_API_VALIDATION_PATH).reply(401, new Error('Auth Error'));

    await main();

    expect(setFailed.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "Unauthorized",
        ],
        Array [
          "We found an error. Please check your logs",
        ],
      ]
    `);
    expect(consoleLogMock).toHaveBeenCalledTimes(1);

    expect(client.isDone()).toBe(true);
  });

  it('Reports errors when section does not have name', async () => {
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/basic_without_name.conf';
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
          "./__fixtures__/basic_without_name.conf: 4:1 error LINTER Attribute \\"name\\" missing 
      ",
        ],
      ]
    `);

    expect(getTokensBySectionIdMock).toHaveBeenCalled();
  });

  it('does not report if configuration is not Fluent Bit/Fluentd', async () => {
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/nginx.conf';

    await main();

    expect(setFailed).not.toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
  });

  it('does not report if configuration schema is empty (parse is not lint-able)', async () => {
    mockedInput[INPUT.CONFIG_LOCATION_GLOB] = '__fixtures__/multiline_parse.conf';

    await main();

    expect(setFailed).not.toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledTimes(1);
  });

  describe('problemMarcher', () => {
    const [
      {
        pattern: [{ regexp }],
      },
    ] = problemMatcher;

    it('Matches file on root', () => {
      const output =
        './some/nested/file/fluent-bit.conf: 10:1 warning PARSER some random error that the parser reported';

      const issue = output.match(new RegExp(regexp));

      if (issue) {
        const [, file, line, column, severity, , message] = issue;

        expect({
          file,
          line,
          column,
          severity,
          message,
        }).toMatchInlineSnapshot(`
          Object {
            "column": "1",
            "file": "./some/nested/file/fluent-bit.conf",
            "line": "10",
            "message": "some random error that the parser reported",
            "severity": "warning",
          }
        `);
      }

      expect.hasAssertions();
    });
    it('Matches file on root', () => {
      const output = './fluent-bit.conf: 84:1 error LINTER cannot initialize input plugin: cpu123';

      const issue = output.match(new RegExp(regexp));

      if (issue) {
        const [, file, line, column, severity, , message] = issue;

        expect({
          file,
          line,
          column,
          severity,
          message,
        }).toMatchInlineSnapshot(`
          Object {
            "column": "1",
            "file": "./fluent-bit.conf",
            "line": "84",
            "message": "cannot initialize input plugin: cpu123",
            "severity": "error",
          }
        `);
      }

      expect.hasAssertions();
    });
  });
});
