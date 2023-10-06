/**
 * Casts a raw attribute value to an integer
 *
 * @param attributeValue The raw value of the attribute
 * @param defaultValue Optional default value to cast to if the
 *   attribute is not set
 */
export function coerceAttributeToInteger(
  attributeValue: string | null,
  defaultValue: number
): number;
export function coerceAttributeToInteger(
  attributeValue: string | null
): number | null;
export function coerceAttributeToInteger(
  attributeValue: string | null,
  defaultValue?: number
): number | null {
  if (attributeValue === null && defaultValue !== undefined) {
    return defaultValue;
  } else if (attributeValue === null) {
    return null;
  }

  const parsedValue = parseInt(attributeValue, 10);

  if (Number.isNaN(parsedValue) && defaultValue !== undefined) {
    return defaultValue;
  } else if (Number.isNaN(parsedValue)) {
    return null;
  }

  return parsedValue;
}
