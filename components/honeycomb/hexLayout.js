// Pointy-top hexagonal spiral layout (Apple Watch launcher style).
// hexSpiral(n) returns n axial coordinates: the center cell first, then
// concentric rings walked clockwise, so array order = visual "radiating" order.

const DIRECTIONS = [
    [1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1],
];

export function hexSpiral(count) {
    const cells = [{ q: 0, r: 0 }];
    let ring = 1;
    while (cells.length < count) {
        let q = DIRECTIONS[4][0] * ring;
        let r = DIRECTIONS[4][1] * ring;
        for (let side = 0; side < 6 && cells.length < count; side++) {
            for (let step = 0; step < ring && cells.length < count; step++) {
                cells.push({ q, r });
                q += DIRECTIONS[side][0];
                r += DIRECTIONS[side][1];
            }
        }
        ring++;
    }
    return cells;
}

// spacing = distance between the centers of two adjacent cells.
export function hexToPixel({ q, r }, spacing) {
    return {
        x: spacing * (q + r / 2),
        y: spacing * r * (Math.sqrt(3) / 2),
    };
}
