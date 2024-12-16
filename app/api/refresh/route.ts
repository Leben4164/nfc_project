import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

// GET 요청 처리: 학생 정보 가져오기
export async function GET() {
    try {
        const dataBuffer = fs.readFileSync(dataFilePath);
        const dataJSON = dataBuffer.toString();
        return NextResponse.json(JSON.parse(dataJSON)); // JSON 형식으로 응답
    } catch (error) {
        console.error('Error reading data:', error);
        return NextResponse.error(); // 오류 발생 시 에러 응답
    }
}