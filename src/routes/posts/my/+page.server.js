import {posts} from '$db/posts'

export async function load(event) {
    let data = await posts.find({author: event.locals.user.id}).toArray();
    data.forEach(element => {
        element._id = element._id.toString();
    });

    return {
        posts: data
    }
}