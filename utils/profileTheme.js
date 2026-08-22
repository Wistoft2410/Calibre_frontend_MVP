// Card colours for profile cards. `bg` fills the photo panel, `ring` is the
// thick border around the photo — the same relationship the original teal had
// (soft pastel panel, deeper ring of the same hue), so vivid interest badges
// still read clearly on top.
export const CARD_THEMES = [
    { bg: '#9ED7CC', ring: '#57B69F' }, // teal (the original)
    { bg: '#F3BDAC', ring: '#DE8768' }, // coral
    { bg: '#C5BBE6', ring: '#9182CD' }, // lavender
    { bg: '#F0D69C', ring: '#D9B45F' }, // butter
    { bg: '#A8CBE7', ring: '#6AA2CF' }, // sky
    { bg: '#EEB6CC', ring: '#D781A6' }, // rose
    { bg: '#B6DEA6', ring: '#83BE6B' }, // mint
    { bg: '#F0C69D', ring: '#D89C60' }, // apricot
];

// Cycles through the palette by deck position. Hashing the id was the obvious
// alternative but collides, and two neighbouring cards in the same colour reads
// as a bug while swiping — walking the list guarantees consecutive cards differ.
export function themeForIndex(index) {
    return CARD_THEMES[index % CARD_THEMES.length];
}

// Attaches a theme to each profile once, at load, so the deck card and the
// expanded card always agree on a person's colour.
export function withThemes(profiles) {
    return (profiles || []).map((profile, i) => ({ ...profile, theme: themeForIndex(i) }));
}
