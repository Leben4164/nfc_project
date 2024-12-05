import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 현재 날짜 및 시간을 문자로 정리해주는 함수
 * 
 * @returns 2024-10-09 06:30:50 형식
 */
function dateText() {
    const date = new Date(); // 현재 날짜 객체 생성
    const utcOffset = 9 * 60; // 한국은 UTC+9
    const localDate = new Date(date.getTime() + utcOffset * 60 * 1000); // UTC 시간을 한국 시간으로 변환

    const year = localDate.getFullYear(); // 년도
    const month = monthToNumber(localDate.toLocaleString('default', { month: 'long' })); // 월(문자 -> 숫자)
    const day = String(localDate.getDate()).padStart(2, '0'); // 일
    const time = localDate.toTimeString().split(" ")[0]; // 시간(00:00:00)

    const dateText = `${year}-${month}-${day} ${time}`; // 형식에 맞춰 문자열 생성
    return dateText;
}

/**
 * oct 같은 달을 나타내는 문자를 숫자로 변환하는 함수
 * @param month string
 * @returns 월(숫자)
 */
function monthToNumber(month: string) {
    return new Date(Date.parse(month + " 1, 2012")).getMonth() + 1
}

export async function POST(request: Request) { //Post 요청 처리
    const res = await request.json(); //요청 본문 받아옴

    try {
        const student = await prisma.student.findUnique({
            where: { uid: res.uid }, // uid로 학생 판별
        });

        if (student) {
            if (!student.attendance) { // attendance === false
                const updatedStudent = await prisma.student.update({
                    where: { id: student.id },
                    data: {
                        attendance: true,          // 출석을 true로 바꾸고
                        attendanceTime: dateText() // 요청을 보냈을 때 시간으로 출석 시간을 설정함
                    }
                });

                return new Response(JSON.stringify({
                    "^": updatedStudent.studentId,
                }), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    status: 201,
                });
            } else { // attendance === true
                return new Response(JSON.stringify({
                    "process": "해당 UID에 해당하는 학생은 이미 출석했습니다."
                }), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    status: 201,
                })
            }
        }
    } catch (error) {
        console.error(error);
    }
}
