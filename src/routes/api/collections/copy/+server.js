import { redirect } from "@sveltejs/kit"
import {collections} from '$db/collections';
import { ObjectId } from "mongodb";

export const POST = async ({ request }) => {
    let data = await request.json();
    const collectionId = data.collectionId;
    const collection = await collections.findOne({ _id: new ObjectId(collectionId) });
    if (!collection) {
        return new Response(null, { status: 404 });
    }
    let copyCollection = collection;
    delete copyCollection._id;
    copyCollection.title = copyCollection.title + " (copy)";
    copyCollection.type = "copy";
    copyCollection.parent = collectionId;

    await collections.insertOne(copyCollection);

    return new Response({copied: true}, { status: 200 })
}

// TODO: check author id
export const GET = async ({ url }) => {
    let data = {collectionId: url.searchParams.get("collectionId"), userId: url.searchParams.get("userId")}
    const collectionId = data.collectionId;
    const collection = await collections.findOne({ parent: new ObjectId(collectionId), type: "copy" });
    if (collection)
    {
        return new Response(JSON.stringify({copied: true}), { status: 200 });
    }

    return new Response(JSON.stringify({copied: false}), { status: 200});
}