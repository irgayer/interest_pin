import { collections } from '$db/collections'
import { posts } from '$db/posts'
import { ObjectId } from 'mongodb'

export async function load({params})
{
    const {id} = params;
    let collection = await collections.findOne({ _id: new ObjectId(id) });
    if (!collection) {
        return new Response(null, { status: 404 });
    }
    // TODO: check access to private collection
    collection._id = collection._id.toString();
    let postsToReturn = [];
    for (let i = 0; i < collection.posts.length; i++) {
        let post = await posts.findOne({ _id: new ObjectId(collection.posts[i]) });
        if (!post) {
            continue;
        }
        post._id = post._id.toString();
        postsToReturn.push(post);
    }
    // collection.posts.forEach(element => {
    //     let post = {};
    //     posts.findOne({ _id: new ObjectId(element) })
    //     .then((result) => {
    //         post = result;
    //         post._id = post._id.toString();
    //         console.log(post._id)
    //         postsToReturn.push(post);
    //     });
    // })

    return {
        collection: collection,
        posts: postsToReturn
    };
}

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const {id} = event.params;
        const postId = data.get('postId');

        const post = await posts.findOne({ _id: new ObjectId(postId) });
        if (!post) {
            return {
                status: 400,
                body: JSON.stringify({ message: 'Post not found' }),
                success: false
            };
        }
        const collection = await collections.findOne({ _id: new ObjectId(id) });
        if (!collection) {
            return {
                status: 400,
                body: JSON.stringify({ message: 'Collection not found' }),
                success: false
            };
        }
        const index = collection.posts.indexOf(postId);
        if (index > -1) {
            collection.posts.splice(index, 1);
        }
        await collections.updateOne({ _id: new ObjectId(id) }, { $set: { posts: collection.posts } });
        return {
            status: 200,
            body: JSON.stringify({ message: 'Post removed from collection' }),
            success: true
        };
    }
}