import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

test("Environment Validation Schema: validates correct environment variables", () => {
  const schema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8000/api/v1"),
  });

  const valid = schema.parse({
    NODE_ENV: "production",
    NEXT_PUBLIC_API_URL: "https://api.redvelvet.luxury/api/v1",
  });

  assert.equal(valid.NODE_ENV, "production");
  assert.equal(valid.NEXT_PUBLIC_API_URL, "https://api.redvelvet.luxury/api/v1");
});

test("Environment Validation Schema: rejects invalid URL formats", () => {
  const schema = z.object({
    NEXT_PUBLIC_API_URL: z.string().url(),
  });

  assert.throws(() => {
    schema.parse({ NEXT_PUBLIC_API_URL: "not-a-valid-url" });
  });
});
