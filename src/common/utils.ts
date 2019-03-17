export const optional = <T extends any>(currentValue?: T, defaultValue?: T) => (currentValue === undefined ? defaultValue : currentValue);
