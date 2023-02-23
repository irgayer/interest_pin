import { redirect } from "@sveltejs/kit"
import {collections} from '$db/collections';
import { ObjectId } from "mongodb";
import {
    isCollectionExists,
    isUserAccessToCollection,
    copyCollection
} from "$lib/dbOperations/collectionsOperations";


export const POST = async (event) => {
    let data = await event.request.json();
    const collectionId = data.collectionId;
    const userId = event.locals.user.id;

    console.log({collectionId, userId})

    const collectionObjectId = new ObjectId(collectionId);
    const userObjectId = new ObjectId(userId);

    if (!isCollectionExists(collectionObjectId))
        throw error(404, 'Not found')
    if (!isUserAccessToCollection(userObjectId, collectionObjectId))
        throw error(403, 'Forbidden')


    let copied = await copyCollection(userObjectId, collectionObjectId);
    console.log(copied)
    if (copied)
        return new Response(JSON.stringify({copied: true}), { status: 200 });

    return new Response(JSON.stringify({copied: false}), { status: 400 });
    // let data = await request.json();
    // const collectionId = data.collectionId;
    // const collection = await collections.findOne({ _id: new ObjectId(collectionId) });
    // if (!collection) {
    //     return new Response(null, { status: 404 });
    // }
    // let copyCollection = collection;
    // delete copyCollection._id;
    // copyCollection.title = copyCollection.title + " (copy)";
    // copyCollection.type = "copy";
    // copyCollection.parent = collectionId;

    // await collections.insertOne(copyCollection);

    // return new Response({copied: true}, { status: 200 })
}

// export const GET = async ({ url }) => {
//     let data = {collectionId: url.searchParams.get("collectionId"), userId: url.searchParams.get("userId")}
//     const collectionId = data.collectionId;
//     const collection = await collections.findOne({ parent: new ObjectId(collectionId), type: "copy" });
//     if (collection)
//     {
//         return new Response(JSON.stringify({copied: true}), { status: 200 });
//     }

//     return new Response(JSON.stringify({copied: false}), { status: 200});
// }