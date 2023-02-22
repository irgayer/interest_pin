import { redirect } from "@sveltejs/kit";
import {collections} from '$db/collections';
import { ObjectId } from "mongodb";

export const POST = async ({ request }) => {
    return new Response({subscribed: true}, { status: 200 })
}

export const DELETE = async ({request}) => {
    const data = await request.json();
    const collectionId = data.collectionId;
    const userId = data.userId;

    const collection = await collections.findOne({ _id: new ObjectId(collectionId) });
    if (!collection) {
        return new Response(null, { status: 404 });
    }

    if (collection?.subs.includes(userId))
    {
        collection.subs.pop(userId);
        return new Response(JSON.stringify({subscribed: false}), { status: 200 });
    }
    return new Response(JSON.stringify({subscribed: false}), { status: 200 });
}

export const GET = async ({ url }) => {
    let data = {collectionId: url.searchParams.get("collectionId"), userId: url.searchParams.get("userId")}
    const collectionId = data.collectionId;
    const userId = data.userId;
    const collection = await collections.findOne({ _id: new ObjectId(collectionId) });
    if (!collection) {
        return new Response(null, { status: 404 });
    }
    if (collection.subs.includes(userId))
    {
        return new Response(JSON.stringify({subscribed: true}), { status: 200 });
    }
    return new Response(JSON.stringify({subscribed: false}), { status: 200})
}