import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data.json');

/**
 * 현재 날짜 및 시간을 문자로 정리해주는 함수
 * 
 * @returns 2024-10-09 06:30:50 형식
 */
function dateText() {
    const date = new Date(); // 현재 날짜 객체 생성
    const utcOffset = 9 * 60; // 한국은 UTC+9
    const localDate = new Date(date.getTime() + utcOffset * 60 * 1000); // UTC 시간을 한국 시간으로 변환

    const year = localDate.getFullYear(); //년도
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // 월을 2자리로
    const day = String(localDate.getDate()).padStart(2, '0'); //일
    const time = localDate.toTimeString().split(" ")[0]; // 시간(00:00:00)

    return `${year}-${month}-${day} ${time}`; // 형식에 맞춰 문자열 생성
};

// POST 요청 처리: 출석 여부 업데이트
export async function POST(request: Request) {
    const { uid } = await request.json(); // 요청 본문에서 uid 가져오기

    try {
        const dataBuffer = fs.readFileSync(dataFilePath);
        const dataJSON = dataBuffer.toString();
        const students = JSON.parse(dataJSON);

        // uid에 해당하는 학생 찾기
        const studentIndex = students.findIndex((student: { studentId: any; }) => student.studentId === uid);
        if (studentIndex === -1) {
            return NextResponse.json({ message: '해당 UID에 해당하는 학생을 찾을 수 없습니다.' }, { status: 404 });
        }

        // 출석 여부 업데이트
        students[studentIndex].attendance = true;
        students[studentIndex].attendanceTime = dateText(); // 출석 시간 설정

        fs.writeFileSync(dataFilePath, JSON.stringify(students, null, 2)); // JSON 파일에 저장
        return NextResponse.json(students[studentIndex]); // 업데이트된 학생 정보 반환
    } catch (error) {
        console.error('Error updating attendance:', error);
        return NextResponse.error(); // 오류 발생 시 에러 응답
    }
}
