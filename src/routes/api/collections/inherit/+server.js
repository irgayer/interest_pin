import { redirect } from "@sveltejs/kit";
import {collections} from '$db/collections';
import { ObjectId } from "mongodb";
import {
    isCollectionExists,
    isUserAccessToCollection,
    isUserSubscribedToCollection,
    subscribeUserToCollection,
    unsubscribeUserFromCollection,
    getCollectionWithPosts
} from '$lib/dbOperations/collectionsOperations';


export const POST = async ({ request }) => {
    const data = await request.json();
    const collectionId = data.collectionId;
    const userId = data.userId;

    const collectionObjectId = new ObjectId(collectionId);
    const userObjectId = new ObjectId(userId);


    if (!isCollectionExists(collectionObjectId))
        throw error(404, 'Not found')

    const collection = await getCollectionWithPosts(collectionObjectId);
    if (collection.author.id === userId)
    {
        return new Response(JSON.stringify({subscribed: true}), { status: 204 });
    }

    if (!isUserAccessToCollection(userObjectId, collectionObjectId))
        throw error(403, 'Forbidden')

    let subscribed = await isUserSubscribedToCollection(userObjectId, collectionObjectId)
    if (!subscribed)
    {
        await subscribeUserToCollection(userObjectId, collectionObjectId);
        return new Response(JSON.stringify({subscribed: true}), { status: 200 });
    }
    else {
        await unsubscribeUserFromCollection(userObjectId, collectionObjectId);
        return new Response(JSON.stringify({subscribed: false}), { status: 200 });
    }

    return new Response(JSON.stringify({subscribed: false}), { status: 200 });

    // const collection = await collections.findOne({ _id: new ObjectId(collectionId) });
    // if (!collection) {
    //     return new Response(null, { status: 404 });
    // }

    // if (collection.author === userId)
    // {
    //     return new Response(JSON.stringify({subscribed: true}), { status: 200 });
    // }
    // if (!collection.subs.includes(userId))
    // {
    //     collection.subs.push(userId);
    //     await collections.updateOne({ _id: new ObjectId(collectionId) }, { $set: { subs: collection.subs } });
    //     return new Response(JSON.stringify({subscribed: true}), { status: 200 });
    // }
    // else {
    //     collection.subs.pop(userId);
    //     await collections.updateOne({ _id: new ObjectId(collectionId) }, { $set: { subs: collection.subs } });
    //     return new Response(JSON.stringify({subscribed: false}), { status: 200 });
    // }
}

export const GET = async ({ url }) => {
    let data = {collectionId: url.searchParams.get("collectionId"), userId: url.searchParams.get("userId")}
    const collectionId = data.collectionId;
    const userId = data.userId;

    const collectionObjectId = new ObjectId(collectionId);
    const userObjectId = new ObjectId(userId);

    if (!isCollectionExists(collectionObjectId))
        throw error(404, 'Not found')
    if (!isUserAccessToCollection(userObjectId, collectionObjectId))
        throw error(403, 'Forbidden')

    const collection = await getCollectionWithPosts(collectionObjectId);
    if (collection.author.id === userId)
    {
        return new Response(JSON.stringify({subscribed: true}), { status: 204 });
    }

    let subscribed = await isUserSubscribedToCollection(userObjectId, collectionObjectId);
    if (subscribed)
    {
        return new Response(JSON.stringify({subscribed: true}), { status: 200 });
    }
    return new Response(JSON.stringify({subscribed: false}), { status: 200 });
}