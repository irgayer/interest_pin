import { users } from '$db/users';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';
import { getPostsByAuthor } from '../../../lib/dbOperations/postsOperations';
import { getFollowingCollectionsByUserId, getCollectionsByAuthor, getCollectionsByUserId } from '../../../lib/dbOperations/collectionsOperations';
import { getAllUserData, isUserExists } from '../../../lib/dbOperations/usersOperations';

export async function load({params}) {
	const id = params.id;

	let user = null;
	try {
		const userObjectId = new ObjectId(id);
		if (!isUserExists(userObjectId))
			throw error(404, 'User not found');

		let user = await getAllUserData(userObjectId);
		user._id = user._id.toString();
		let posts = await getPostsByAuthor(userObjectId);
		let collections = await getCollectionsByUserId(userObjectId);
		return {
			user: user,
			collections: collections,
			posts: posts
		};
	} catch(err) {
		console.log(err);
		console.log("ERROR PARSING ID")
		throw error(404, 'User not found');
	}
	throw error(404, 'User not found');
};
