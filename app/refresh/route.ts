import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const students = await prisma.student.findMany({
            orderBy: {
                studentId: 'asc', // 학번 오름차순으로 정렬
            },
        });
        return NextResponse.json(students); // JSON 형식으로 응답
    } catch (error) {
        console.error('Error fetching students:', error);
        return NextResponse.error(); // 오류 발생 시 에러 응답
    }
}
