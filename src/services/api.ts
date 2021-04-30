import { request } from "alita";

export async function query(): Promise<any> {
  return request("/api/hello");
}

export async function generate(data: any): Promise<any> {
  return request("/api/generate", { data });
}
