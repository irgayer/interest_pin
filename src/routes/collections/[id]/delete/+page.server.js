import { redirect } from '@sveltejs/kit';
import { collections } from '$db/collections';
import { ObjectId } from 'mongodb';
import { isCollectionExists } from '../../../../lib/dbOperations/collectionsOperations';

export const load = async ({ session }) => {
	throw redirect(302, '/');
};

export const actions = {
	default: async ({ params }) => {
		const collectionId = params.id;
		const collectionObjectId = new ObjectId(collectionId);

		const exists = await isCollectionExists(collectionObjectId);
		if (!exists) {
			throw redirect(302, '/collections/my');
		}

		if (exists) {
			await collections.deleteOne({ _id: new ObjectId(collectionId) });
			throw redirect(302, '/collections/my');
		}
	}
};
