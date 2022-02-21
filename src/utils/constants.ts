import { getBorderCharacters } from 'table';
export const CALYPTIA_API_ENDPOINT = 'https://cloud-api.calyptia.com';
export const CALYPTIA_API_VALIDATION_PATH = 'v1/config_validate_v2';

export const PROBLEM_MATCHER_FILE_NAME = 'problem-matcher.json';

export const FALSE_VALUE = 'false';
export const NO_STYLES_IN_TABLE = {
  border: getBorderCharacters('void'),
  columnDefault: {
    paddingLeft: 0,
    paddingRight: 1,
  },
  drawHorizontalLine: (): boolean => false,
};

export const ACTION_MESSAGES = {
  CONFIG_ERRORS: 'We found errors in your configurations. Please check your logs',
  FATAL_ERROR: 'We found an error. Please check your logs',
};

export const ATTRIBUTE_NAME_MISSING = 'Attribute "name" missing';
