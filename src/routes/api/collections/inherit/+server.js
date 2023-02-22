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

    if (collection?.subs.contains(userId))
    {
        collection.subs.pop(userId);
        return new Response({subscribed: false}, { status: 200 });
    }
    return new Response({subscribed: false}, { status: 200 });
}

export const GET = async ({ request }) => {
    const data = await request.json();
    const collectionId = data.collectionId;
    const userId = data.userId;
    const collection = await collections.findOne({ _id: new ObjectId(collectionId) });
    if (!collection) {
        return new Response(null, { status: 404 });
    }

    if (collection?.subs.contains(userId))
    {
        return new Response({subscribed: true}, { status: 200 });
    }
    return new Response({subscribed: false}, { status: 200})
}