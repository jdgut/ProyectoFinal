import { describe, expect, it } from "vitest";

import router from "../src/router";
import { clearUser, saveUser } from "../src/stores/session";

describe("router guard dashboard", () => {
  it("redirige a home sin usuario", async () => {
    clearUser();
    await router.push("/dashboard");
    expect(router.currentRoute.value.fullPath).toBe("/");
  });

  it("permite dashboard con usuario", async () => {
    saveUser({ id: 2, email: "admin@eafit.edu.co", role: "administrador", created_at: "2026-01-01T10:00:00" });
    await router.push("/dashboard");
    expect(router.currentRoute.value.fullPath).toBe("/dashboard");
  });
});
