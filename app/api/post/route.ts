import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/supabase';

/**
 * 현재 날짜 및 시간을 문자로 정리해주는 함수
 * 
 * @returns 2024-10-09 06:30:50 형식
 */
function dateText() {
    const date = new Date(); // 현재 날짜 객체 생성
    const utcOffset = 9 * 60; // 한국은 UTC+9
    const localDate = new Date(date.getTime() + utcOffset * 60 * 1000); // UTC 시간을 한국 시간으로 변환

    const year = localDate.getFullYear(); // 년도
    const month = monthToNumber(localDate.toLocaleString('default', { month: 'long' })); // 월(문자 -> 숫자)
    const day = String(localDate.getDate()).padStart(2, '0'); // 일
    const time = localDate.toTimeString().split(" ")[0]; // 시간(00:00:00)

    const dateText = `${year}-${month}-${day} ${time}`; // 형식에 맞춰 문자열 생성
    return dateText;
}

/**
 * oct 같은 달을 나타내는 문자를 숫자로 변환하는 함수
 * @param month string
 * @returns 월(숫자)
 */
function monthToNumber(month: string) {
    return new Date(Date.parse(month + " 1, 2012")).getMonth() + 1
}

export async function POST(request: Request) {
    const { uid } = await request.json();
    const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!)

    try {
        const { error } = await supabase.from('students').update({
            attendance: true,
            attendance_time: dateText()
        }).eq('uid', uid)
        const { data: existingData, error: checkError } = await supabase
            .from('students')
            .select('attendance, student_id')
            .eq('uid', uid)
            .single(); // 단일 객체로 반환

        if (checkError) {
            throw checkError;
        };

        return new Response(String(existingData.attendance), {
            status: 200,
            headers: { 'Content-Type': 'text/plain' },
        });

        // if (existingData.attendance) {
        //     return new Response("^^^^^", {
        //         status: 200,
        //         headers: { 'Content-Type': 'text/plain' },
        //     });
        // }
        // return new Response("^"+String(existingData.student_id), {
        //     status: 200,
        //     headers: { 'Content-Type': 'text/plain' },
        // });
        //return NextResponse.json({ result: "sucwwwss" }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: '출석 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
