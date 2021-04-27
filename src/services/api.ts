import { request } from "alita";

export async function query(): Promise<any> {
  return request("/api/hello");
}

export async function getTempsListData(): Promise<any> {
  return request("/api/tempsListData", { method: "GET" });
}
