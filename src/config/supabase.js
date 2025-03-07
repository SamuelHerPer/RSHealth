import { createClient } from "@supabase/supabase-js";

// Contiene la credenciales para conectarse a supabase.
const supabaseConexion = createClient(
  "https://fmillghsodilriovigzs.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtaWxsZ2hzb2RpbHJpb3ZpZ3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MjQ5MDUsImV4cCI6MjAyNDEwMDkwNX0.S1S1HaC8cm9O69lejA2PcJpqJ1NWvCmGKUuR5mStprU"
);

export { supabaseConexion };