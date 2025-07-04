import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://bwxrnalbcbrjjeqrhsga.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3eHJuYWxiY2JyamplcXJoc2dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NzA4MzgsImV4cCI6MjA2NjM0NjgzOH0.sdj4RliabVG1n0pG0MJlULyt1B5UJfAwQXMIJrXb1rQ';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };