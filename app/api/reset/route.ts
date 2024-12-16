import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

// POST 요청 처리: 모든 학생의 출석 초기화
export async function POST() {
    try {
        const dataBuffer = fs.readFileSync(dataFilePath);
        const dataJSON = dataBuffer.toString();
        const students = JSON.parse(dataJSON);

        // 모든 학생의 출석 여부를 false로 설정
        const updatedStudents = students.map((student: any) => ({
            ...student,
            attendance: false,
            attendanceTime: null,
            whatHappened: ''
        }));

        fs.writeFileSync(dataFilePath, JSON.stringify(updatedStudents, null, 2)); // JSON 파일에 저장
        return NextResponse.json(updatedStudents); // 초기화된 학생 정보 반환
    } catch (error) {
        console.error('Error resetting attendance:', error);
        return NextResponse.error(); // 오류 발생 시 에러 응답
    }
}
