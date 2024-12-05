import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
    try {
        await prisma.student.updateMany({
            data: {
                attendance: false,    // 모든 학생의 출석을 false로 바꾸고
                attendanceTime: null, // 출석 시간을 공백으로 바꿈
            },
        });
        return NextResponse.json({ message: '출석을 초기화하는데 성공했습니다.' }); // 성공 메시지 반환
    } catch (error) {
        console.error('출석 초기화 오류:', error);
        return NextResponse.error(); // 오류 발생 시 에러 응답
    }
}
