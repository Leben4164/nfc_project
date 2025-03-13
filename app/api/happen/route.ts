import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request: Request) {
    const { studentName, whatHappened } = await request.json();

    try {
        const student = await prisma.students.findFirst({
            where: { name: studentName },
        });
        if (!student) {
            return NextResponse.json({ message: '해당 이름의 학생을 찾을 수 없습니다.' }, { status: 404 });
        }

        await prisma.students.update({
            where: { id: student.id },
            data: { whatHappened },
        });
        return NextResponse.json({ message: '결석 사유가 업데이트 되었습니다.', student });
    } catch (error) {
        console.error('Error updating what happened:', error);
        return NextResponse.error();
    }
}
