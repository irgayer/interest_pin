import { collections } from "$db/collections";
import { ObjectId } from "mongodb";

export const actions = {
    default: async(event) => {
        const data = await event.request.formData();
        const title = data.get('title');
        const description = data.get('description');
        const image = data.get('image');
        const upload = data.get('upload');
        const type = data.get('type');
        if (!title) {
            return {
                status: 400,
                body: JSON.stringify({ message: 'Missing fields' }),
                success: false
            }
        }
        let cover = {
            image,
            params: {file_name: upload}
        }
        let subscribers = [new ObjectId(event.locals.user.id)]
        let collection = {author: new ObjectId(event.locals.user.id), type, title, description, posts: [], cover, subscribers: subscribers};
        collections.insertOne(collection);
        return {
            status: 201,
            body: JSON.stringify({ message: 'Collection created' }),
            success: true
        }
    }
}