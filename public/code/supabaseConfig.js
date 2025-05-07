import { createClient } from '@supabase/supabase-js';

// Thay thế các giá trị này bằng thông tin Supabase của bạn
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 