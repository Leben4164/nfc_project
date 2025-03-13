import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // 프리즈마 클라이언트 임포트

export async function POST() {
    try {
        // 모든 학생의 출석 초기화
        await prisma.students.updateMany({ // 프리즈마를 사용하여 모든 학생의 출석 초기화
            data: {
                attendance: false,
                attendanceTime: undefined,
                whatHappened: '',
            },
        });
        const updatedStudents = await prisma.students.findMany(); // 초기화된 학생 정보 가져오기
        return NextResponse.json(updatedStudents); // 초기화된 학생 정보 반환
    } catch (error) {
        console.error('Error resetting attendance:', error);
        return NextResponse.error();
    }
}
