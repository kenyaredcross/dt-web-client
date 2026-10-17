const BASE = process.env.NEXT_PUBLIC_FRAPPE_URL ?? "http://localhost:8000"

export async function frappeFetch<T>(
  method: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`/api/method/${method}`, BASE)
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  const res = await fetch(url.toString(), { cache: "no-store" })
  if (!res.ok) throw new Error(`Frappe ${res.status}: ${method}`)
  const json = await res.json()
  return json.message as T
}
