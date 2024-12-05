import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST 요청 처리: 결석 사유 업데이트
export async function POST(request: Request) {
    const { studentName, whatHappened } = await request.json();

    if (!studentName || !whatHappened) {
        return NextResponse.json({ message: '학생 이름과 결석 사유를 입력해야 합니다.' }, { status: 400 });
    }

    try {
        const student = await prisma.student.findUnique({
            where: { uid: studentName } // uid를 사용하여 학생의 정보 저장
        });

        if (student) {
            await prisma.student.update({
                where: { id: student.id },
                data: {
                    whatHappened: whatHappened // 결석 사유를 입력된 값으로 설정
                }
            });

            return NextResponse.json({ message: '결석 사유가 업데이트 되었습니다.' }); // 성공 메시지 반환
        } else {
            return NextResponse.json({ message: '해당 이름의 학생을 찾을 수 없습니다.' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error updating what happened:', error);
        return NextResponse.error(); // 오류 발생 시 에러 응답
    }
}
