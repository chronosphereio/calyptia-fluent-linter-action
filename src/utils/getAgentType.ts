import { FluentBitSchema } from '@calyptia/fluent-bit-config-parser';
import { AGENT_TYPE } from './constants';
import { isFluentD } from './isFluentD';

export function getAgentType(content: string): AGENT_TYPE | undefined {
  if (FluentBitSchema.isFluentBitConfiguration(content)) {
    return AGENT_TYPE.FLUENT_BIT;
  }

  if (isFluentD(content)) {
    return AGENT_TYPE.FLUENT_D;
  }

  return undefined;
}
