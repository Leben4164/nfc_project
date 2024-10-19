import PocketBase from 'pocketbase';

export async function GET(request : Request) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    const res = await request.json(); // 요청 본문에서 속성 이름 가져오기

    try {
        const records = await pb.collection('students').getFullList(); // 모든 레코드 가져오기
        //const values = records.map(record => record[res.propName]); // 속성 이름에 해당하는 값들만 배열로 만들기
        //return new Response(JSON.stringify(values), { // 값 배열 반환
        return new Response(JSON.stringify(records), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });
    } catch(error) {
        console.error(error);
        return new Response(JSON.stringify({
            "process" : "fail"
        }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 201,
        });
    }
}
