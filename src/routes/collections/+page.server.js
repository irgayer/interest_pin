import { collections } from '$db/collections'

export async function load() {
    let data = await collections.find({type: 'public'}).toArray();

    data.forEach(element => {
        element._id = element._id.toString();
        console.log(element.title)
    });

    return {
        collections: data
    }
}