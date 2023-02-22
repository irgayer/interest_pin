import { redirect } from '@sveltejs/kit';
import { collections } from '$db/collections';
import { ObjectId } from 'mongodb';

export const load = async ({ session }) => {
	throw redirect(302, '/');
};

export const actions = {
	default: async ({ params }) => {
		const collectionId = params.id;
		const collection = await collections.findOne({ _id: new ObjectId(collectionId) });

		if (!collection) {
			throw redirect(302, '/collections/my');
		}

		if (collection) {
			await collections.deleteOne({ _id: new ObjectId(collectionId) });
			throw redirect(302, '/collections/my');
		}
	}
};
