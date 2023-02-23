import { collections } from '$db/collections'
import { getAllNonPrivateCollections } from '../../lib/dbOperations/collectionsOperations';

export async function load() {
    let data = await getAllNonPrivateCollections();

    return {
        collections: data
    }
}