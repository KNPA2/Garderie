const PREFIX = 'gererie.';

function safeLocalStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function readCollection<T>(key: string): T[] {
  const storage = safeLocalStorage();
  if (!storage) {
    return [];
  }
  const raw = storage.getItem(PREFIX + key);
  if (!raw) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

export function writeCollection<T>(key: string, items: T[]): void {
  const storage = safeLocalStorage();
  if (!storage) {
    return;
  }
  storage.setItem(PREFIX + key, JSON.stringify(items));
}

export function removeCollection(key: string): void {
  const storage = safeLocalStorage();
  if (!storage) {
    return;
  }
  storage.removeItem(PREFIX + key);
}
