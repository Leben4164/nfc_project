import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

// POST 요청 처리: 결석 사유 업데이트
export async function POST(request: Request) {
    const { studentName, whatHappened } = await request.json(); // 요청 본문에서 학생 이름과 결석 사유 가져오기

    try {
        const dataBuffer = fs.readFileSync(dataFilePath);
        const dataJSON = dataBuffer.toString();
        const students = JSON.parse(dataJSON);

        // 학생 이름에 해당하는 학생 찾기
        const studentIndex = students.findIndex((student: { name: any; }) => student.name === studentName);
        if (studentIndex === -1) {
            return NextResponse.json({ message: '해당 이름의 학생을 찾을 수 없습니다.' }, { status: 404 });
        }

        // 결석 사유 업데이트
        students[studentIndex].whatHappened = whatHappened; // 결석 사유 업데이트

        fs.writeFileSync(dataFilePath, JSON.stringify(students, null, 2)); // JSON 파일에 저장
        return NextResponse.json({ message: '결석 사유가 업데이트 되었습니다.', student: students[studentIndex] }); // 성공 메시지와 업데이트된 학생 정보 반환
    } catch (error) {
        console.error('Error updating what happened:', error);
        return NextResponse.error(); // 오류 발생 시 에러 응답
    }
}
