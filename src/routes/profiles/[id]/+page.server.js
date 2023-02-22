import { collections } from '$db/collections';
import { posts } from '$db/posts';
import { users } from '$db/users';
import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';

export async function load(event) {
	let user = await users.findOne({ _id: new ObjectId(event.locals.user.id) });
    user._id = user._id.toString();
	if (!user) {
		throw error(404, 'User not found');
	}
	let p = await posts.find({ author: event.locals.user.id }).toArray();
	p.forEach((element) => {
		element._id = element._id.toString();
	});

	let c = await collections.find({author: event.locals.user.id}).toArray();
	c.forEach((element) => {
		element._id = element._id.toString();
	});

    let d = await collections.find({subs: event.locals.user.id}).toArray();
    d.forEach((element) => {
        element._id = element._id.toString();
    });

	return {
		user: user,
		collections: c,
        following: d,
		posts: p
	};
};
