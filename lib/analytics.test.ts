import { test } from "node:test";
import assert from "node:assert/strict";
import { computePercentChange } from "@/lib/analyticsMath";

test("computePercentChange returns a positive percentage when clicks increased", () => {
    assert.strictEqual(computePercentChange(118, 100), 18);
});

test("computePercentChange returns a negative percentage when clicks decreased", () => {
    assert.strictEqual(computePercentChange(82, 100), -18);
});

test("computePercentChange returns 0 when there is no change", () => {
    assert.strictEqual(computePercentChange(100, 100), 0);
});

test("computePercentChange returns \"new\" when previous period had zero clicks but current has clicks", () => {
    assert.strictEqual(computePercentChange(50, 0), "new");
});

test("computePercentChange returns null when both periods had zero clicks", () => {
    assert.strictEqual(computePercentChange(0, 0), null);
});

test("computePercentChange returns -100 when clicks dropped to zero", () => {
    assert.strictEqual(computePercentChange(0, 50), -100);
});
