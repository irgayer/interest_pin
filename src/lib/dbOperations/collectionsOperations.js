import { collections } from '$db/collections';

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
			{ $addFields: { _id: { $toString: '$_id' } } }
		])
		.toArray();

	return data;
}

export async function getCollectionsByUserId(userId) {
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
			{ $addFields: { _id: { $toString: '$_id' } } }
		])
		.toArray();

	return data;
}



export async function isUserAccessToCollection(userId, collectionId)
{
    let data = await collections.findOne({_id: collectionId});
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
    let collection = await collections.find({_id: collectionId});

    if (collection.subscribers.includes(userId)) return false;

    collection.subscribers.push(userId);
    await collections.updateOne({_id: collectionId}, {$set: {subscribers: collection.subscribers}});

    return true;
}

export async function unsubscribeUserFromCollection(userId, collectionId)
{
    let collection = await collections.find({_id: collectionId});
    if (!collection.subscribers.includes(userId)) return false;

    collection.subscribers = collection.subscribers.filter(x => x !== userId);
    await collections.updateOne({_id: collectionId}, {$set: {subscribers: collection.subscribers}});
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
            {
                $lookup: {
                    from: 'posts',
                    localField: 'posts',
                    foreignField: '_id',
                    as: 'posts',
                    pipeline: [
                        { $project: { title: 1, _id: { $toString: '$_id' }, description: 1, tags: 1, author: 1 } },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'author',
                                foreignField: '_id',
                                as: 'author',
                                pipeline: [{ $project: { username: 1, _id: { $toString: '$_id' } } }]
                            }
                        },
                        { $unwind: '$author' }
                    ]
                }
            },
            { $unwind: '$author' },
            { $addFields: { _id: { $toString: '$_id' } } }
        ])
        .toArray();

    return data;
}