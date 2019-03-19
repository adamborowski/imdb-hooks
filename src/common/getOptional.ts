import _ from 'lodash';

export default function<D, S>(
  object: any,
  path: string,
  transform: (value: D) => S,
  defaultValue?: D
) {
  const value: D = _.get(object, path, defaultValue) as D;
  if (value !== undefined) {
    return transform(value);
  }
  return undefined;
}
