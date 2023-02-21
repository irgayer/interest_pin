import { collections } from '$db/collections';

/** @type {import('./$types').RequestHandler} */
export const GET = async () => {
    let data = await collections.find({}).toArray();
    data.forEach(element => element._id = element._id.toString());
    console.log(data);
    return new Response(JSON.stringify(data));
}
