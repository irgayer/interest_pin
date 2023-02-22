import { collections } from '$db/collections'

export async function load(event) {
    let data = await collections.find({$or: [{author: event.locals.user.id}, {subs: event.locals.user.id} ]}).toArray();

    data.forEach(element => {
        element._id = element._id.toString();
    });

    return {
        collections: data
    }
}