
import PocketBase from 'pocketbase'

/**
 * 현재 날짜 및 시간을 문자로 정리해주는 함수
 * 
 * date[0] : 요일 
 * 
 * date[1] : 월(문자)
 * 
 * date[2] : 일
 * 
 * date[3] : 년
 * 
 * date[4] : 시간
 * 
 * @returns 2024-10-09 06:30:50 형식
 */
function dateText() {
    const date = Date().split(" ") //Date()의 반환값(string)을 공백을 기준으로 잘라 순서대로 배열에 저장함
    const dateText = date[3]     //년
        + "-"                    //-
        + monthToNumber(date[1]) //월(숫자)
        + "-"                    //-
        + date[2]                //일
        + " "                    //공백
        + date[4]                //시간(00:00:00)
    return dateText
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
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    const res = await request.json(); //요청 본문 받아옴

    try {
        const record = await pb.collection('students').getFirstListItem(`uid="${res.uid}"`) //본문에서 받은 uid로 학생 판별
        if (record) {
            if (!record.attendance) { //attendance === false
                await pb.collection('students').update(record.id, {
                    attendance: true,          //출석을 true로 바꾸고
                    attendanceTime: dateText() //요청을 보냈을 때 시간으로 출석 시간을 설정함
                });

                return new Response(JSON.stringify({
                    "^": record.studentId,
                }), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    status: 201,
                });
            } else { //attendance === true
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
