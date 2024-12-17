import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpiyonahzzjybakffyzp.supabase.co'; // Replace with your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaXlvbmFoenpqeWJha2ZmeXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE4NTg1NTAsImV4cCI6MjA0NzQzNDU1MH0.STMZsI8RZtoEcmf0ipJdWHSVOmqwkhEG54IBqoxwD-E'; // Replace with your Supabase Anon Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

