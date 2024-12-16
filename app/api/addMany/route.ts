import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
    try {
        const students = await request.json();
        
        const result = await prisma.students.createMany({
            data: students
        });
        
        return NextResponse.json({ message: `${result.count}명의 학생이 추가되었습니다.` });
    } catch (error) {
        console.error('Error adding students:', error);
        return NextResponse.json({ error: '학생 추가 중 오류가 발생했습니다.' }, { status: 500 });
    }
} 