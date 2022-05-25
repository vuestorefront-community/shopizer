export function isCheckValueAndSetParams(params, value) {
  if (typeof (value) === 'undefined' || value === null || value === '') {
    return '';
  }
  return params + value;
}
