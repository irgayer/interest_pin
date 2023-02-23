import { collections } from '$db/collections';
import { getPostById } from './postsOperations';
import { ObjectId } from 'mongodb';

export async function isCollectionExists(collectionId) {
	let data = await collections.find({ _id: collectionId }).toArray();

	if (data.length === 0) return false;

	return true;
}

export async function getAllNonPrivateCollections() {
	let data = await collections
		.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'author',
					foreignField: '_id',
					as: 'author',
					pipeline: [{ $project: { username: 1, _id: { $toString: '$_id' } } }]
				}
			},
			{ $unwind: '$author' },
			{
				$addFields: {
					_id: { $toString: '$_id' },
					parent: { $toString: '$parent' },
					subscribers: { $map: { input: '$subscribers', in: { $toString: '$$this' } } }
				}
			}
		])
		.toArray();

	return data;
}

export async function getCollectionsByUserId(userId) {
	let data = await collections
		.aggregate([
			{ $match: { $or: [{author: userId}, {subscribers: userId}] } },
			{
				$lookup: {
					from: 'users',
					localField: 'author',
					foreignField: '_id',
					as: 'author',
					pipeline: [{ $project: { username: 1, _id: { $toString: '$_id' } } }]
				}
			},
			{ $unwind: '$author' },
			{
				$addFields: {
					_id: { $toString: '$_id' },
					parent: { $toString: '$parent' },
					subscribers: { $map: { input: '$subscribers', in: { $toString: '$$this' } } }
				}
			}
		])
		.toArray();

	return data;
}

export async function getCollectionsByAuthor(userId)
{
	let data = await collections
		.aggregate([
			{ $match: { author: userId } },
			{
				$lookup: {
					from: 'users',
					localField: 'author',
					foreignField: '_id',
					as: 'author',
					pipeline: [{ $project: { username: 1, _id: { $toString: '$_id' } } }]
				}
			},
			{ $unwind: '$author' },
			{
				$addFields: {
					_id: { $toString: '$_id' },
					parent: { $toString: '$parent' },
					subscribers: { $map: { input: '$subscribers', in: { $toString: '$$this' } } }
				}
			}
		])
		.toArray();

	return data;
}

export async function getFollowingCollectionsByUserId(userId)
{
    let data = await collections
		.aggregate([
			{ $match: { subscribers: userId } },
			{
				$lookup: {
					from: 'users',
					localField: 'author',
					foreignField: '_id',
					as: 'author',
					pipeline: [{ $project: { username: 1, _id: { $toString: '$_id' } } }]
				}
			},
			{ $unwind: '$author' },
			{
				$addFields: {
					_id: { $toString: '$_id' },
					parent: { $toString: '$parent' },
					subscribers: { $map: { input: '$subscribers', in: { $toString: '$$this' } } }
				}
			}
		])
		.toArray();

	return data;
}

export async function isUserAccessToCollection(userId, collectionId) {
	let data = await collections.findOne({ _id: collectionId });
	if (data.type === 'public') return true;

	if (data.type === 'private' && data.author === userId) return true;

	return false;
}

export async function isUserSubscribedToCollection(userId, collectionId) {
	let data = await collections.find({ _id: collectionId, subscribers: userId }).toArray();

	if (data.length === 0) return false;

	return true;
}

export async function subscribeUserToCollection(userId, collectionId) {
	let collection = await collections.findOne({ _id: collectionId });

	if (collection.subscribers.includes(userId)) return false;

	collection.subscribers.push(userId);

	await collections.updateOne(
		{ _id: collectionId },
		{ $set: { subscribers: collection.subscribers } }
	);

	return true;
}

export async function unsubscribeUserFromCollection(userId, collectionId) {
	let collection = await collections.findOne({ _id: collectionId });
    let flag = true;

    if (!flag) return false;

    collection.subscribers = collection.subscribers.filter((item) => item.toString() !== userId.toString());

	await collections.updateOne(
		{ _id: collectionId },
		{ $set: { subscribers: collection.subscribers } }
	);

	return true;
}

export async function getCollectionWithPosts(collectionId) {
	let data = await collections
		.aggregate([
			{ $match: { _id: collectionId } },
			{
				$lookup: {
					from: 'users',
					localField: 'author',
					foreignField: '_id',
					as: 'author',
					pipeline: [{ $project: { username: 1, _id: { $toString: '$_id' } } }]
				}
			},
			{ $unwind: '$author' },
			{ $unwind: '$author' },
			{
				$addFields: {
					_id: { $toString: '$_id' },
					parent: { $toString: '$parent' },
					subscribers: { $map: { input: '$subscribers', in: { $toString: '$$this' } } }
				}
			}
		])
		.toArray();

	data = data[0];
	let posts = []
	for (let i = 0; i < data.posts.length; i++) {
		let post = await getPostById(new ObjectId(data.posts[i]))
		if (!post)
			continue;
		posts.push(post);
	}

	data.posts = posts;

	if (data.length === 0) return null;

	return data;
}

export async function copyCollection(userId, collectionId) {
	let data = await collections.findOne({ _id: collectionId });
	if (!data) return null;

	let copyCollection = data;
	delete copyCollection._id;
	copyCollection.title = copyCollection.title + ' (copy)';
	copyCollection.type = 'copy';
	copyCollection.parent = collectionId;
	copyCollection.author = userId;
	copyCollection.subscribers = [userId];

	let inserted = await collections.insertOne(copyCollection);

	return inserted;
}
