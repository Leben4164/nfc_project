import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // 수정된 임포트 경로

export async function GET() {
    try {
        const students = await prisma.students.findMany(); // student -> students로 수정
        return NextResponse.json(students); // JSON 형식으로 응답
    } catch (error) {
        console.error('Error reading data:', error);
        return NextResponse.error();
    }
}