import { ObjectId } from "mongodb";
import { posts } from "$db/posts";

export async function getPostsByAuthor(userObjectId)
{
    let p = await posts.aggregate([
        {$match: {author: userObjectId}},
        {$lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
            pipeline: [
                {$project:
                    {username: 1, "_id": {"$toString": "$_id"}}
                }]
            }
        }, {$unwind: "$author"},
        {$addFields: {_id: {"$toString": "$_id"}}}]).toArray();
    return p;
}

export async function getAllPosts(skip, take)
{
    let p = await posts.aggregate([
        {$lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
            pipeline: [
                {$project:
                    {username: 1, "_id": {"$toString": "$_id"}}
                }]
            }
        }, {$unwind: "$author"},
        {$addFields: {_id: {"$toString": "$_id"}}}, {$skip: skip}, {$limit: take}]).toArray();
    return p;
}

export async function getPostById(postObjectId)
{
    let p = await posts.aggregate([
        {$match: {_id: postObjectId}},
        {$lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
            pipeline: [
                {$project:
                    {username: 1, "_id": {"$toString": "$_id"}}
                }]
            }
        }, {$unwind: "$author"},
        {$addFields: {_id: {"$toString": "$_id"}}}]).toArray();

    if (p.length === 0)
    {
        return null;
    }
    return p[0];
}