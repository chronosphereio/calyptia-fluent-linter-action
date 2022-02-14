import { FluentBitSchema } from '@calyptia/fluent-bit-config-parser';
import { ConfigValidatorV2Service, OpenAPI, ValidatingConfig } from '../generated/calyptia/index';
import fetch, { Headers } from 'node-fetch';
import { readFileSync } from 'fs';

global.Headers = Headers;
global.fetch = fetch;

describe.skip('Endpoint', () => {
  it('should return response', async () => {
    const rawConfig = readFileSync('__fixtures__/invalid.conf', { encoding: 'utf-8' });

    const config = new FluentBitSchema(rawConfig, '/ephemeral.conf');

    const CALYPTIA_API_KEY = 'XXXXXXXXX';

    const headers = {
      'Content-Type': 'application/json',
      'x-project-token': CALYPTIA_API_KEY,
    };

    OpenAPI.WITH_CREDENTIALS = true;
    OpenAPI.TOKEN = CALYPTIA_API_KEY;
    OpenAPI.HEADERS = headers;

    // const URL = `${CALYPTIA_API_ENDPOINT} /v1/config_validate_v2`;

    const { schema } = config;

    expect(schema).toMatchInlineSnapshot(`
      Array [
        Object {
          "command": "INPUT",
          "id": "7240821e-6399-4c80-8c13-7ae08ce09904",
          "name": "tail",
          "optional": Object {
            "path": "/var/log/example-log.log",
            "read_from_head": "true",
            "tag": "unparsed",
          },
        },
        Object {
          "command": "INPUT",
          "id": "17c47e19-8538-48ea-bd93-a0be71b61afa",
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
          "id": "c9499acc-77a3-4270-ad71-29d423c36f87",
          "name": "syslog",
          "optional": Object {
            "mode": "abc",
            "port": "3000",
          },
        },
        Object {
          "command": "FILTER",
          "id": "fd92b4c1-f96d-442c-8280-6a117a7a91a1",
          "name": "nest",
          "optional": Object {
            "match": "k8senriched",
            "nested_under": "log",
            "operation": "lift",
          },
        },
        Object {
          "command": "FILTER",
          "id": "318d7033-5c86-44a9-9120-404b69b03c29",
          "name": "parser",
          "optional": Object {
            "match": "k8senriched",
            "parser": "logfmt",
          },
        },
      ]
    `);
    const response = await ConfigValidatorV2Service.validateConfigV2({ config: schema } as ValidatingConfig);

    expect(response).toMatchInlineSnapshot('200');
  });
});
