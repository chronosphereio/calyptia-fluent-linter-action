import { main, InputValues } from '../src';
import { setFailed, getInput, setOutput, error } from '../__mocks__/@actions/core';

describe('invoke-aws-lambda', () => {
  const mockedInput = {
    [InputValues.GITHUB_TOKEN]: 'GITHUB_TOKEN',
    [InputValues.CALYPTIA_API_KEY]:
      'eyJUb2tlbklEIjoiMzBiOTkxYTAtYjQ0My00ZTUwLWEwZGUtNDAwYThlMmEyNmVkIiwiUHJvamVjdElEIjoiN2JhZThmNTEtNGQwYi00ODY4LTllMmQtYWQzNWEzZTRlYTliIn0.7sSHp_u4Bz5r38CBavTmFmMrc2WL4gPcv4ta2EEiMUDcCe3_F2mR59DgnkdCqNH-',
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
    await main();
    expect(setFailed).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(setOutput.mock.calls).toMatchInlineSnapshot('Array []');
  });
});
