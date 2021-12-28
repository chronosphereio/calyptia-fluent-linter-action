import { FLUENTD_REGEX } from "./constants";

export const isFluentD = (config: string) => !!config.match(FLUENTD_REGEX);
