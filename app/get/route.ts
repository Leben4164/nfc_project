import PocketBase from 'pocketbase';

export async function GET(request: Request) { //Get 요청 처리
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

  // URL 쿼리 매개변수에서 propName 가져오기
  const url = new URL(request.url);
  const propName = url.searchParams.get("propName"); // 쿼리 매개변수에서 propName 가져오기

  try {
    const records = await pb.collection("students").getFullList(); // 모든 레코드 가져오기
    const values = records.map((record) => record[propName!]); // 속성 이름에 해당하는 값들만 배열로 만들기
    return new Response(JSON.stringify({
      "process" : "DB의 모든 학생을 대상으로 해당하는 속성 정보를 추출하였습니다",
      "result" : values
    }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch records" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
}
