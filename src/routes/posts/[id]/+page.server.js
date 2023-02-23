import {posts} from '$db/posts'
import { ObjectId } from 'mongodb';
import {error, redirect } from '@sveltejs/kit';
import { getPostById } from '../../../lib/dbOperations/postsOperations';

export async function load({params})
{
    const {id} = params;
    let post = await getPostById(new ObjectId(id));
    if (!post)
    {
        throw error(404, 'Post not found');
    }
    return {
        post: post
    }
}

export const actions = {
    delete: async (event) => {
        const {id} = event.params;
        const existing = await posts.findOne({_id: new ObjectId(id)});

        if (existing === null)
        {
            throw error(404, 'Post not found');
        }
        await posts.deleteOne({_id: new ObjectId(id)});
        throw redirect(303, '/posts');
        return {
            status: 200,
            body: 'Post deleted'
        }
    }
}