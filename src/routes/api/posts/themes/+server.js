import {posts} from '$db/posts';

export const GET = async ({url}) => {
    let themeName = url.searchParams.get("theme");

    let data = await posts.find({themes: themeName}).toArray();
    data.forEach(post => {
        post._id = post._id.toString();
    })

    return new Response(JSON.stringify(data), {status: 200});
}