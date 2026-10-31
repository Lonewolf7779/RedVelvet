import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 20 }, // Ramp up
    { duration: "20s", target: 20 }, // Steady state
    { duration: "5s", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95% of requests must complete below 200ms
    http_req_failed: ["rate<0.01"], // Less than 1% errors
  },
};

const BASE_URL = __ENV.TARGET_URL || "http://localhost:8000";

export default function () {
  const res = http.get(`${BASE_URL}/api/v1/health/live`);
  check(res, {
    "status is 200": (r) => r.status === 200,
    "status is ok": (r) => JSON.parse(r.body).status === "ok",
  });
  sleep(0.5);
}
