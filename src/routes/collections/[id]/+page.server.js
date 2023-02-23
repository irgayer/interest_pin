import { collections } from '$db/collections'
import { posts } from '$db/posts'
import { redirect, error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb'
import { isCollectionExists, isUserAccessToCollection, getCollectionsByUserIdWithPosts, getCollectionWithPosts } from '../../../lib/dbOperations/collectionsOperations';

export async function load(event)
{
    const {id} = event.params;
    const collectionObjectId = new ObjectId(id);
    const userObjectId = new ObjectId(event.locals.user.id);

    if (!isCollectionExists(collectionObjectId))
        throw error(404, 'Not found')

    if (!isUserAccessToCollection(userObjectId, collectionObjectId))
    {
        throw error(403, 'Forbidden')
    }

    const cls = await getCollectionWithPosts(collectionObjectId);

    return {
        collection: cls
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