import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://upxngjsfgvqqgbsapppe.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVweG5nanNmZ3ZxcWdic2FwcHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3ODgxNzksImV4cCI6MjAxOTM2NDE3OX0.2L0f91OzlwAe6r2TbAKSmOIqSIXN1iDtwqfQMPrFTYY";
const supabase = createClient(
  "https://upxngjsfgvqqgbsapppe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVweG5nanNmZ3ZxcWdic2FwcHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3ODgxNzksImV4cCI6MjAxOTM2NDE3OX0.2L0f91OzlwAe6r2TbAKSmOIqSIXN1iDtwqfQMPrFTYY"
);

export default supabase;
