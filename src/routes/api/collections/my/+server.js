import { collections } from '$db/collections';
import { posts } from '$db/posts';
import { ObjectId } from 'mongodb';
import { getCollectionsByAuthor, getCollectionsByUserId } from '../../../../lib/dbOperations/collectionsOperations';

/** @type {import('./$types').RequestHandler} */
export const GET = async (event) => {
    let data = await getCollectionsByAuthor(new ObjectId(event.locals.user.id));
    return new Response(JSON.stringify(data));
}


export const POST = async({request}) => {
    let data = await request.json();

    const post = posts.findOne({ _id: new ObjectId(data.postId) });
    if (!post) {
        return new Response(null, { status: 404 });
    }

    data.collections.forEach(async element => {
        const collection = await collections.findOne({ _id: new ObjectId(element) });
        if (!collection) {
            return;
        }
        if (!collection.posts)
        {
            collection.posts = [];
        }
        if (!element.checked)
        {
            collection.posts.pop(data.postId);
        }
        else {
            if (!collection.posts.includes(data.postId))
                collection.posts.push(data.postId);
        }

        await collections.updateOne({ _id: new ObjectId(element.id) }, { $set: collection });
    });

    return new Response(JSON.stringify(data), { status: 200 });
}
