import { NextResponse } from 'next/server';
import { initialStudents } from '../../../data/students';

// 서버 사이드에서 공유할 수 있는 상태 저장소
let globalStudents = initialStudents;

export function updateGlobalStudents(newStudents: Student[]) {
    globalStudents = newStudents;
}

export async function POST(request: Request) {
    const { uid } = await request.json();

    try {
        // 전역 상태에서 학생 찾기
        const student = globalStudents.find(s => s.uid === uid);
        if (!student) {
            return NextResponse.json({ message: '학생을 찾을 수 없습니다.' }, { status: 404 });
        }

        // 학생 출석 상태 업데이트
        student.attendance = true;
        student.attendanceTime = new Date().toISOString();

        return NextResponse.json(student);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: '출석 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
}
