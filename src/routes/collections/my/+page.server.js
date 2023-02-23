import { collections } from '$db/collections'
import { ObjectId } from 'mongodb';
import { getCollectionsByUserId } from '../../../lib/dbOperations/collectionsOperations';

export async function load(event) {
    let data = await getCollectionsByUserId(new ObjectId(event.locals.user.id));

    return {
        collections: data
    }
}