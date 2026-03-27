import { supabase } from './lib/supabase';

async function checkPromos() {
  console.log('Fetching active promotions...');
  const { data, error } = await supabase
    .from('promotions')
    .select('*')
    .eq('is_active', true);
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Active Promos:', data);
  }
}

checkPromos();
