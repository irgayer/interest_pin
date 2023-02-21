import {posts} from '$db/posts'

export async function load() {
    let data = await posts.find({}).toArray();
    data.forEach(element => {
        element._id = element._id.toString();
    });
    // return {
    //     posts: [{title: 'Hello World', description: 'This is a test post'},
    //     {title: 'Hello World', description: 'This is a test post'}]
    // }
    return {
        posts: data
    };
}