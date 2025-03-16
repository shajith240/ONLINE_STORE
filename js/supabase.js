import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bkngqinpajoyvedkupwk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrbmdxaW5wYWpveXZlZGt1cHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMTY3MTksImV4cCI6MjA1NzY5MjcxOX0.mjX_lpevHspC0DBVkrFRPfcLUJru34CveOH5Kk3autM'

export const supabase = createClient(supabaseUrl, supabaseKey)