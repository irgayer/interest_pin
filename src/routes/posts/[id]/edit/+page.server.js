import { posts } from "$db/posts";
import { redirect, error } from "@sveltejs/kit";
import { ObjectId } from 'mongodb';
import { getPostById, changePostById, deletePostById } from "../../../../lib/dbOperations/postsOperations";

export async function load({params}) {
    const {id} = params;
    let post = getPostById(new ObjectId(id));

    if (!post) {
        throw error(404, 'Not Found')
    }
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

        let post = getPostById(new ObjectId(id));
        if (post === null)
        {
            throw error(404, 'Not Found');
        }

        await changePostById(new ObjectId(id), {title, description});
        return {
            status: 200,
            body: JSON.stringify({ message: 'Post updated' }),
            success: true
        }
    },
    delete: async (event) => {
        const {id} = event.params;
        const existing = getPostById(new ObjectId(id));

        if (existing === null)
        {
            throw error(404, 'Not Found');
        }
        await deletePostById(new ObjectId(id));
        throw redirect (301, '/posts');
        //{
        //     status: 200,
        //     body: JSON.stringify({ message: 'Post deleted' }),
        //     success: true
        // }
    },
    addTheme: async (event) => {
        const data = await event.request.formData();
        const theme = data.get('themeName');
        const {id} = event.params;

        let post = await posts.findOne({_id: new ObjectId(id)});
        if (post === null)
        {
            throw error(404, 'Not Found');
        }

        await posts.updateOne({_id: new ObjectId(id)}, {$addToSet: {themes: theme}});
        return {
            status: 200,
            body: JSON.stringify({ message: 'Theme added' }),
            success: true
        }

    },

    deleteTheme: async(event) => {
        const data = await event.request.formData();
        const theme = data.get('themeName');
        const {id} = event.params;

        let post = await posts.findOne({_id: new ObjectId(id)});
        if (post === null)
        {
            throw error(404, 'Not Found');
        }

        await posts.updateOne({_id: new ObjectId(id)}, {$pull: {themes: theme}});
        return {
            status: 200,
            body: JSON.stringify({ message: 'Theme deleted' }),
            success: true
        }
    }
}