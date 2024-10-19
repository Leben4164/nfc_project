import PocketBase from 'pocketbase';

export async function GET(request : Request) {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    const res = request.json()

    try {
        const record = await pb.collection('students').getList(1, 50, {
            sort: '+studentId',
        });
        setItems(record.items);
        console.log(record.items)
    } catch(error) {
        console.error(error)
    }

    return new Response(JSON.stringify({
        "process" : "success"
    }), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 201,
    })
}
