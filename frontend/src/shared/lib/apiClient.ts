const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    credentials: 'include',
    cache: 'no-store',
  });
  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`HTTP error! status: ${response.status}, body: ${body}`);
  }
  return (response.status === 204 ? undefined : await response.json()) as T;
}

export const apiGet = <T>(path: string) => request<T>(path);

function csrfHeader(): Record<string, string> {
  if (typeof document === 'undefined') return {};
  const m = document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]+)/);
  return m ? { 'X-XSRF-TOKEN': decodeURIComponent(m[1]) } : {};
}

export function apiSend<T>(
  method: 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: unknown,
): Promise<T> {
  return request<T>(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...csrfHeader(),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export function apiUpload<T>(path: string, formData: FormData): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    headers: {
      ...csrfHeader(),
    },
    body: formData,
  });
}
