import { FluentBitSchema } from '@calyptia/fluent-bit-config-parser';
import type { ValidatedConfigV2 } from '../generated/calyptia/index';
import fetch, { Headers } from 'node-fetch';
import { CALYPTIA_API_ENDPOINT } from '../src/utils/constants';
import { readFileSync } from 'fs';

global.Headers = Headers;
global.fetch = fetch;
describe.skip('Endpoint', () => {
  it('should return response', async () => {
    const rawConfig = readFileSync('__fixtures__/invalid.conf', { encoding: 'utf-8' });

    const config = new FluentBitSchema(rawConfig, '/ephemeral.conf');

    const CALYPTIA_API_KEY = 'XXXXXX';

    const headers = {
      'Content-Type': 'application/json',
      'x-project-token': CALYPTIA_API_KEY,
    };

    // OpenAPI.HEADERS = headers;

    const URL = `${CALYPTIA_API_ENDPOINT}/v1/config_validate_v2`;

    const { schema } = config;
    expect(schema).toMatchInlineSnapshot(`
      Array [
        Object {
          "command": "INPUT",
          "id": "1cd12fa6-a264-4558-a281-d3642bc6969e",
          "name": "tail",
          "optional": Object {
            "path": "/var/log/example-log.log",
            "read_from_head": "true",
            "tag": "unparsed",
          },
        },
        Object {
          "command": "INPUT",
          "id": "47b5f893-b617-498f-a644-09bbdf88f014",
          "name": "john",
          "optional": Object {
            "parser": "docker",
            "path": "/var/log/example-log-k8s.log",
            "read_from_head": "qwe",
            "tag": "k8senriched",
          },
        },
        Object {
          "command": "INPUT",
          "id": "49e66e6c-aac6-4ef4-8a9d-8829b91c72d2",
          "name": "syslog",
          "optional": Object {
            "mode": "abc",
            "port": "3000",
          },
        },
        Object {
          "command": "FILTER",
          "id": "a70d4d5d-3db8-4511-a2c9-d41129aec4cc",
          "name": "nest",
          "optional": Object {
            "match": "k8senriched",
            "nested_under": "log",
            "operation": "lift",
          },
        },
        Object {
          "command": "FILTER",
          "id": "9df81e1e-0504-4f8e-a186-7f19d432651c",
          "name": "parser",
          "optional": Object {
            "match": "k8senriched",
            "parser": "logfmt",
          },
        },
      ]
    `);
    // const toValidate: ValidatingConfig = { config: config.schema };
    const response = (await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ config: schema }),
      headers,
    })) as Response;

    const data = (await response.json()) as unknown as ValidatedConfigV2;

    expect(response.status).toMatchInlineSnapshot('200');
    console.log(JSON.stringify(data));

    expect(data).toMatchInlineSnapshot(`
      Object {
        "errors": Object {
          "filter": Object {
            "parser": Array [
              Object {
                "errors": Array [
                  "missing 'key_name'",
                ],
                "id": "9df81e1e-0504-4f8e-a186-7f19d432651c",
                "property": "start",
                "text": "",
              },
            ],
          },
          "input": Object {
            "syslog": Array [
              Object {
                "errors": Array [
                  "Unknown syslog mode abc",
                ],
                "id": "49e66e6c-aac6-4ef4-8a9d-8829b91c72d2",
                "property": "start",
                "text": "",
              },
            ],
          },
          "output": Object {},
          "runtime": Array [
            Object {
              "errors": Array [
                "cannot initialize input plugin: john",
              ],
              "id": "47b5f893-b617-498f-a644-09bbdf88f014",
            },
          ],
        },
      }
    `);
  });
});
