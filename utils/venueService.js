import { supabase } from './supabase';

const mapVenue = (row) => ({
    id: row.id,
    name: row.name,
    address: row.address,
    latitude: row.latitude,
    longitude: row.longitude,
    category: row.category,
    interests: row.interests || [],
    price: row.price,
    partnerStatus: row.partner_status,
    description: row.description,
    phone: row.phone,
    website: row.website,
    rating: row.rating,
    reviewsCount: row.reviews_count,
    photoReference: row.photo_reference,
});

// Partner venues that can actually be placed on the map. Rows without
// coordinates (no address in the source list yet) are filtered out here rather
// than in the screen, so adding an address in Supabase is all it takes to make
// a partner appear.
export async function listMapVenues() {
    const { data, error } = await supabase
        .from('venues')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .order('name');

    if (error) {
        console.warn('listMapVenues failed:', error.message);
        return [];
    }
    return (data || []).map(mapVenue);
}
