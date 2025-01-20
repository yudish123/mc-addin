// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// This code has a security loophole, as currently in supabase there is no RLS so
// anyone can access our database.
const supabaseUrl = "https://ocshwkscmiuirhpvvhcv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jc2h3a3NjbWl1aXJocHZ2aGN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MjU3MjIsImV4cCI6MjA0NzUwMTcyMn0._6wrgBQhzx0-GJGg0Z8Um7reJ6O9vbP_vXUIYR6zjac";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
