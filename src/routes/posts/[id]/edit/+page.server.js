import { posts } from "$db/posts";
import { ObjectId } from 'mongodb';

export async function load({params}) {
    const {id} = params;
    let post = await posts.findOne({_id: new ObjectId(id)});

    post._id = post._id.toString();
    if (post === null)
    {
        throw error(404, 'Not Found');
    }

    return {
        post: post
    };
}

export const actions = {
    edit: async (event) => {
        const data = await event.request.formData();
        const title = data.get('title');
        const description = data.get('description');
        const {id} = event.params;

        if (!title) {
            return {
                status: 400,
                body: JSON.stringify({ message: 'Missing title' }),
                success: false
            }
        }

        let post = await posts.findOne({_id: new ObjectId(id)});
        if (post === null)
        {
            throw error(404, 'Not Found');
        }

        await posts.updateOne({_id: new ObjectId(id)}, {$set: {title: title, description: description}});
        return {
            status: 200,
            body: JSON.stringify({ message: 'Post updated' }),
            success: true
        }
    },
    delete: async (event) => {
        const {id} = event.params;
        const existing = await posts.findOne({_id: new ObjectId(id)});

        if (existing === null)
        {
            throw error(404, 'Not Found');
        }
        await posts.deleteOne({_id: new ObjectId(id)});
        return {
            status: 200,
            body: JSON.stringify({ message: 'Post deleted' }),
            success: true
        }
    }
}