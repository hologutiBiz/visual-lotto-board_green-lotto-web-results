// src/utils/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Fetch all games
export const getGames = async () => {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('display_order');
  
  if (error) throw error;
  return data;
};

// Fetch today's results (real-time results)
export const getTodayResults = async () => {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('realtime_results')
    .select('*, games(*)')
    .eq('draw_date', today)
    .order('draw_time', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Search real-time results by specific date
export const getResultsByDate = async (date) => {
  const { data, error } = await supabase
    .from('realtime_results')
    .select('*, games(*)')
    .eq('draw_date', date)
    .order('draw_time', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Search today's results by game name
export const searchTodayResults = async (searchTerm) => {
  const today = new Date().toISOString().split('T')[0];
  const { data, error } = await supabase
    .from('realtime_results')
    .select('*, games(*)')
    .eq('draw_date', today)
    .ilike('games.game_name', `%${searchTerm}%`)
    .order('draw_time', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Fetch game results (historical) - ALL results for a specific game
export const getGameResults = async (gameId) => {
  const { data, error } = await supabase
    .from('game_results')
    .select('*')
    .eq('game_id', gameId)
    .order('draw_date', { ascending: false });
  
  if (error) throw error;
  return data;
};