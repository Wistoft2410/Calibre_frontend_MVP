// Single source of truth for the selectable passions/interests.
// - interestsEmoji: unicode char, rendered directly in the honeycomb picker.
// - emojiName: react-native-emoji shortcode, used by the profile/user cards
//   which render <Emoji name={...}/> ({emoji, bgColor} shape from the old API).
// Profiles store passion names (text[] in Supabase); map back with
// interestsForDisplay() wherever cards need emoji + color.
export const PASSIONS = [
    { ID: 1, interest: 'Soccer', interestsEmoji: '⚽', emojiName: 'soccer', bgColor: '#A9E34B', color: '#1A1A1A' },
    { ID: 2, interest: 'Coding', interestsEmoji: '👾', emojiName: 'space_invader', bgColor: '#F5D653', color: '#1A1A1A' },
    { ID: 3, interest: 'Basket', interestsEmoji: '🏀', emojiName: 'basketball', bgColor: '#3F87AB', color: '#1A1A1A' },
    { ID: 4, interest: 'Reading', interestsEmoji: '📚', emojiName: 'books', bgColor: '#F5A353', color: '#1A1A1A' },
    { ID: 5, interest: 'Painting', interestsEmoji: '🎨', emojiName: 'art', bgColor: '#F55393', color: '#1A1A1A' },
    { ID: 6, interest: 'Photography', interestsEmoji: '📸', emojiName: 'camera_with_flash', bgColor: '#6C53F5', color: '#FFFFFF' },
    { ID: 7, interest: 'Music', interestsEmoji: '🎵', emojiName: 'musical_note', bgColor: '#F55353', color: '#1A1A1A' },
    { ID: 8, interest: 'Gaming', interestsEmoji: '🎮', emojiName: 'video_game', bgColor: '#CF88DD', color: '#1A1A1A' },
    { ID: 9, interest: 'Cooking', interestsEmoji: '🍳', emojiName: 'fried_egg', bgColor: '#BD5827', color: '#FFFFFF' },
    { ID: 10, interest: 'Travel', interestsEmoji: '✈️', emojiName: 'airplane', bgColor: '#3FAB96', color: '#1A1A1A' },
    { ID: 11, interest: 'Fitness', interestsEmoji: '🏋️', emojiName: 'weight_lifter', bgColor: '#31E331', color: '#1A1A1A' },
    { ID: 12, interest: 'Movies', interestsEmoji: '🎬', emojiName: 'clapper', bgColor: '#5375F5', color: '#1A1A1A' },
    { ID: 13, interest: 'Dancing', interestsEmoji: '💃', emojiName: 'dancer', bgColor: '#F553E0', color: '#1A1A1A' },
    { ID: 14, interest: 'Hiking', interestsEmoji: '🥾', emojiName: 'athletic_shoe', bgColor: '#96AB3F', color: '#1A1A1A' },
    { ID: 15, interest: 'Coffee', interestsEmoji: '☕', emojiName: 'coffee', bgColor: '#B98455', color: '#1A1A1A' },
    { ID: 16, interest: 'Nature', interestsEmoji: '🌱', emojiName: 'seedling', bgColor: '#4FCB8D', color: '#1A1A1A' },
    { ID: 17, interest: 'Skiing', interestsEmoji: '⛷️', emojiName: 'ski', bgColor: '#9FB9F5', color: '#1A1A1A' },
    { ID: 18, interest: 'Singing', interestsEmoji: '🎤', emojiName: 'microphone', bgColor: '#FF8FAB', color: '#1A1A1A' },
    { ID: 19, interest: 'Yoga', interestsEmoji: '🧘', emojiName: 'person_in_lotus_position', bgColor: '#B5EAD7', color: '#1A1A1A' },
    // Added for the partner venues on the meetup map — these are the interest
    // categories the partner list uses that weren't already covered.
    { ID: 20, interest: 'Board Games', interestsEmoji: '🎲', emojiName: 'game_die', bgColor: '#3FAB43', color: '#1A1A1A' },
    { ID: 21, interest: 'DIY', interestsEmoji: '🛠️', emojiName: 'hammer_and_wrench', bgColor: '#D6D18F', color: '#1A1A1A' },
    { ID: 22, interest: 'Tech', interestsEmoji: '💻', emojiName: 'computer', bgColor: '#3F63AB', color: '#FFFFFF' },
    { ID: 23, interest: 'Cycling', interestsEmoji: '🚴', emojiName: 'bicyclist', bgColor: '#B79834', color: '#1A1A1A' },
    { ID: 24, interest: 'Watersports', interestsEmoji: '🏄', emojiName: 'surfer', bgColor: '#3BC9DB', color: '#1A1A1A' },
    { ID: 25, interest: 'Gymnastics', interestsEmoji: '🤸', emojiName: 'person_doing_cartwheel', bgColor: '#AB3F51', color: '#FFFFFF' },
    { ID: 26, interest: 'Jazz', interestsEmoji: '🎷', emojiName: 'saxophone', bgColor: '#803FAB', color: '#FFFFFF' },
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
