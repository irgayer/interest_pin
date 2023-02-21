import {posts} from '$db/posts'

export async function load() {
    let data = await posts.find({}).toArray();
    data.forEach(element => {
        element._id = element._id.toString();
    });

    return {
        posts: data
    }
}