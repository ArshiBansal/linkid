export function computePercentChange(current: number, previous: number): number | "new" | null {
    if (previous === 0) {
        return current === 0 ? null : "new";
    }
    return ((current - previous) / previous) * 100;
}