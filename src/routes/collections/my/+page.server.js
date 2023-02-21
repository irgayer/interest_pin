import { collections } from '$db/collections'

export async function load() {
    let data = await collections.find({}).toArray();

    data.forEach(element => {
        element._id = element._id.toString();
    });

    return {
        collections: data
    }
}