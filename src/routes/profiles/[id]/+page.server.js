import { collections } from '$db/collections';
import { posts } from '$db/posts';
import { users } from '$db/users';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';
import { getPostsByAuthor } from '../../../lib/dbOperations/postsOperations';

export async function load({params}) {
	const id= params.id;

	let user = null;
	try {
		const userObjectId = new ObjectId(id);
		user = await users.findOne({ _id: userObjectId });

		if (!user) {
			throw error(404, 'User not found');
		}

		user._id = user._id.toString();
		let p = await getPostsByAuthor(user._id);

		let c = await collections.find({author: userObjectId}).toArray();
		c.forEach((element) => {
			element._id = element._id.toString();
		});

		let d = await collections.find({subs: userObjectId}).toArray();
		d.forEach((element) => {
			element._id = element._id.toString();
		});

		return {
			user: user,
			collections: c,
			following: d,
			posts: p
		};
	} catch(err) {
		console.log(err);
		console.log("ERROR PARSING ID")
		throw error(404, 'User not found');
	}
	throw error(404, 'User not found');
};
