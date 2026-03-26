import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('Testing Supabase connection...')
  try {
    const { data, error } = await supabase.from('reservations').select('count', { count: 'exact', head: true })
    if (error) throw error
    console.log('✅ Supabase Connection: Success')
    console.log('✅ Tables accessible: reservations')
    
    const { data: menuData, error: menuError } = await supabase.from('menu_items').select('count', { count: 'exact', head: true })
    if (!menuError) console.log('✅ Tables accessible: menu_items')

    const { data: promoData, error: promoError } = await supabase.from('promotions').select('count', { count: 'exact', head: true })
    if (!promoError) console.log('✅ Tables accessible: promotions')

     const { data: galleryData, error: galleryError } = await supabase.from('gallery_images').select('count', { count: 'exact', head: true })
    if (!galleryError) console.log('✅ Tables accessible: gallery_images')

  } catch (error) {
    console.error('❌ Supabase Connection Failed:', error)
  }
}

testConnection()
