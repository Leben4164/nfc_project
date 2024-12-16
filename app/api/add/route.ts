import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        const student = await prisma.students.create({
            data: {
                name: data.name,
                studentId: data.studentId,
                uid: data.uid,
                attendance: false, // 기본값
                attendanceTime: null,
                whatHappened: null
            }
        });
        
        return NextResponse.json({ message: '학생이 추가되었습니다.', student });
    } catch (error) {
        console.error('Error adding student:', error);
        return NextResponse.json({ error: '학생 추가 중 오류가 발생했습니다.' }, { status: 500 });
    }
} 