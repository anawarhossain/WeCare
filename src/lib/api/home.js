// lib/api/home.js
import { serverGet } from "../core/server";

export async function getHomeOverview() {
  return await serverGet("api/home/overview");
}
