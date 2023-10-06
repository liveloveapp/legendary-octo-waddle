export function getClientSourceId(
  localStorage: Storage,
  config: {
    clientKey: string;
    userId: string;
  }
) {
  const key = `clientSourceId/${config.clientKey}/${config.userId}`;
  const existing = localStorage.getItem(key);

  if (existing) return existing;

  const newId = crypto.randomUUID();

  localStorage.setItem(key, newId);

  return newId;
}
