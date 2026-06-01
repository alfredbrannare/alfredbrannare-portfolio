const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export async function apiGet<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, { cache: "no-store" });
    if (!response.ok) {
        throw new Error(`API ${path} failed: ${response.status}`);
    }
    return await response.json() as Promise<T>;
}