
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qlmteykiahcouyjlqsdh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbXRleWtpYWhjb3V5amxxc2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjgxNjEsImV4cCI6MjA2NTU0NDE2MX0.M3llJn-s-smbdTNcqkzr0mEUx9LoQngN_vFABctUBFk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
