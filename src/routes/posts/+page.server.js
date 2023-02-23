import {posts} from '$db/posts'
import { getAllPosts } from '../../lib/dbOperations/postsOperations';

export async function load() {
    // let data = await posts.aggregate([
    //     {$lookup: {
    //         from: "users",
    //         localField: "author",
    //         foreignField: "_id",
    //         as: "author",
    //         pipeline: [
    //             {$project:
    //                 {username: 1, "_id": {"$toString": "$_id"}}
    //             }]
    //         }
    //     }, {$unwind: "$author"},
    //     {$addFields: {_id: {"$toString": "$_id"}}}]).toArray();
    //     console.log(data.author)
    let data = await getAllPosts(0, 100);
    // return {
    //     posts: [{title: 'Hello World', description: 'This is a test post'},
    //     {title: 'Hello World', description: 'This is a test post'}]
    // }
    return {
        posts: data
    };
}