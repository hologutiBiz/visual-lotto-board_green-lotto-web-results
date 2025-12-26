import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch all games
export const getGames = async () => {
    const {data, error } = await supabase
        .from("games")
        .select('*')
        .order('display_order');

    if (error) throw error;
    return data;
};

// fetch today's results
export const getTodayResults = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
        .from('realtime_results')
        .select('*, games(*)')
        .eq('draw_date', today);

    if (error) throw error;
    return data;
};

// Fetch game results (historical)
export const getGameResults = async (gameId) => {
  const { data, error } = await supabase
    .from('game_results')
    .select('*')
    .eq('game_id', gameId)
    .order('draw_date', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Search results by date
export const searchResultsByDate = async (gameId, date) => {
  const { data, error } = await supabase
    .from('game_results')
    .select('*')
    .eq('game_id', gameId)
    .eq('draw_date', date);
  
  if (error) throw error;
  return data;
};