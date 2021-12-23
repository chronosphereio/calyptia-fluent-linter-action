import { main, InputValues } from '../src';
import { setFailed, getInput, setOutput, error } from '../__mocks__/@actions/core';
import nock from 'nock';
import failCase from '../__fixtures__/scenarios/failed_case.json';
import { CALYPTIA_API_ENDPOINT, CALYPTIA_API_VALIDATION_PATH } from '../src/utils/constants';
describe('fluent-linter-action', () => {
  const mockedInput = {
    [InputValues.GITHUB_TOKEN]: 'GITHUB_TOKEN',
    [InputValues.CALYPTIA_API_KEY]: 'API_TOKEN',
    [InputValues.CONFIG_LOCATION_GLOB]: '__fixtures__/*.conf',
  };

  beforeAll(() => {
    getInput.mockImplementation((key: Partial<InputValues>) => {
      return mockedInput[key];
    });
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
    expect(error).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            [Error: Linting Error],
            Object {
              "file": "<PROJECT_ROOT>/__fixtures__/invalid1.conf",
              "message": "[john]: cannot initialize input plugin: john
      [syslog]: Unknown syslog mode abc",
              "title": "input",
            },
          ],
          Array [
            [Error: Linting Error],
            Object {
              "file": "<PROJECT_ROOT>/__fixtures__/invalid1.conf",
              "message": "[parser]: missing 'key_name'",
              "title": "filter",
            },
          ],
        ],
        "results": Array [
          Object {
            "type": "return",
            "value": undefined,
          },
          Object {
            "type": "return",
            "value": undefined,
          },
        ],
      }
    `);
    expect(client.isDone()).toBe(true);
  }, 5000000000);
});
