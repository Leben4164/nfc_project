import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/supabase';

export async function POST(request: Request) {
    const { uid } = await request.json();
    const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

    try {
        const { data } = await supabase.from('students').select('uid', uid)
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: '출석 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
