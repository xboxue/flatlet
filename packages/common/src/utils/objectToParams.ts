export const objectToParams = (params: { [param: string]: string }) =>
  Object.entries(params)
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join('&');
