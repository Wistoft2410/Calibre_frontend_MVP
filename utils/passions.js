// Single source of truth for the selectable passions/interests.
// - interestsEmoji: unicode char, rendered directly in the honeycomb picker.
// - emojiName: react-native-emoji shortcode, used by the profile/user cards
//   which render <Emoji name={...}/> ({emoji, bgColor} shape from the old API).
// Profiles store passion names (text[] in Supabase); map back with
// interestsForDisplay() wherever cards need emoji + color.
export const PASSIONS = [
    { ID: 1, interest: 'Soccer', interestsEmoji: '⚽', emojiName: 'soccer', bgColor: '#A9E34B', color: '#33430E' },
    { ID: 2, interest: 'Coding', interestsEmoji: '👾', emojiName: 'space_invader', bgColor: '#F5D653', color: '#4A3F0A' },
    { ID: 3, interest: 'Basket', interestsEmoji: '🏀', emojiName: 'basketball', bgColor: '#54B9F5', color: '#0A3552' },
    { ID: 4, interest: 'Reading', interestsEmoji: '📚', emojiName: 'books', bgColor: '#F5A353', color: '#52320A' },
    { ID: 5, interest: 'Painting', interestsEmoji: '🎨', emojiName: 'art', bgColor: '#F55393', color: '#4A0A24' },
    { ID: 6, interest: 'Photography', interestsEmoji: '📸', emojiName: 'camera_with_flash', bgColor: '#6C53F5', color: '#FFFFFF' },
    { ID: 7, interest: 'Music', interestsEmoji: '🎵', emojiName: 'musical_note', bgColor: '#F55353', color: '#4A0A0A' },
    { ID: 8, interest: 'Gaming', interestsEmoji: '🎮', emojiName: 'video_game', bgColor: '#8E53F5', color: '#FFFFFF' },
    { ID: 9, interest: 'Cooking', interestsEmoji: '🍳', emojiName: 'fried_egg', bgColor: '#F58653', color: '#4A250A' },
    { ID: 10, interest: 'Travel', interestsEmoji: '✈️', emojiName: 'airplane', bgColor: '#53E0F5', color: '#0A3F4A' },
    { ID: 11, interest: 'Fitness', interestsEmoji: '🏋️', emojiName: 'weight_lifter', bgColor: '#7BE353', color: '#1E430E' },
    { ID: 12, interest: 'Movies', interestsEmoji: '🎬', emojiName: 'clapper', bgColor: '#5375F5', color: '#FFFFFF' },
    { ID: 13, interest: 'Dancing', interestsEmoji: '💃', emojiName: 'dancer', bgColor: '#F553E0', color: '#4A0A3F' },
    { ID: 14, interest: 'Hiking', interestsEmoji: '🥾', emojiName: 'athletic_shoe', bgColor: '#9BC53D', color: '#2F3B0A' },
    { ID: 15, interest: 'Coffee', interestsEmoji: '☕', emojiName: 'coffee', bgColor: '#B98455', color: '#FFFFFF' },
    { ID: 16, interest: 'Nature', interestsEmoji: '🌱', emojiName: 'seedling', bgColor: '#4FCB8D', color: '#0A3B24' },
    { ID: 17, interest: 'Skiing', interestsEmoji: '⛷️', emojiName: 'ski', bgColor: '#9FB9F5', color: '#1A2B5E' },
    { ID: 18, interest: 'Singing', interestsEmoji: '🎤', emojiName: 'microphone', bgColor: '#FF8FAB', color: '#5E1A32' },
    { ID: 19, interest: 'Yoga', interestsEmoji: '🧘', emojiName: 'person_in_lotus_position', bgColor: '#B5EAD7', color: '#1F4436' },
];

const byName = {};
PASSIONS.forEach(p => { byName[p.interest.toLowerCase()] = p; });

// ['Soccer', 'Coffee'] -> [{emoji: 'soccer', bgColor: '#...'}, ...]
// Matches the {emoji, bgColor} shape userCard/Profile already render.
export function interestsForDisplay(names) {
    if (!Array.isArray(names)) return [];
    return names
        .map(name => byName[String(name).toLowerCase()])
        .filter(Boolean)
        .map(p => ({ emoji: p.emojiName, bgColor: p.bgColor }));
}
