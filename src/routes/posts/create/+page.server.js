import { posts } from "$db/posts";

export const actions = {
    default: async(event) => {
        const data = await event.request.formData();
        const title = data.get('title');
        const image = data.get('image');
        const description = data.get('description');
        const upload = data.get('upload');
        if (!title) {
            return {
                status: 400,
                body: JSON.stringify({ message: 'Missing fields' }),
                success: false
            }
        }
        let post = {title, image, description, params: {file_name: upload}, date: Date.now()};

        posts.insertOne(post);
        return {
            status: 201,
            body: JSON.stringify({ message: 'Post created' }),
            success: true
        }
    }
}