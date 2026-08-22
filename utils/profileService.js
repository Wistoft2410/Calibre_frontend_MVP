import { supabase } from './supabase';

// Maps a snake_case profiles row to the camelCase shape the screens already
// use (same field names the old getUserInfo.php returned).
const mapProfile = (row) => ({
    id: row.id,
    userId: row.user_id,
    firstName: row.first_name,
    lastName: row.last_name,
    bday: row.bday,
    gender: row.gender,
    phone: row.phone,
    city: row.city,
    cityLat: row.city_lat,
    cityLng: row.city_lng,
    country: row.country,
    email: row.email,
    description: row.description,
    profileImage: row.profile_image_url,
    interests: row.interests || [],
    isFake: row.is_fake,
});

// The signed-in user's own profile row (null if signed out or no row yet).
export async function getOwnProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

    if (error) {
        console.warn('getOwnProfile failed:', error.message);
        return null;
    }
    return data ? mapProfile(data) : null;
}

// Everyone except the signed-in user, for the Discover People feed.
// (Seeded fake profiles have user_id = null, so the filter must treat
// null as "someone else", not exclude it.)
export async function listDiscoverProfiles() {
    const { data: { user } } = await supabase.auth.getUser();

    let query = supabase.from('profiles').select('*').order('created_at');
    if (user) {
        query = query.or(`user_id.is.null,user_id.neq.${user.id}`);
    }

    const { data, error } = await query;
    if (error) {
        console.warn('listDiscoverProfiles failed:', error.message);
        return [];
    }
    return (data || []).map(mapProfile);
}
