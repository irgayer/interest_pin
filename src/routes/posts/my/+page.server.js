import {posts} from '$db/posts'
import { getPostsByAuthor } from '../../../lib/dbOperations/postsOperations';
import { ObjectId } from 'mongodb';


export async function load(event) {
    let data = await getPostsByAuthor(new ObjectId(event.locals.user.id));

    return {
        posts: data
    }
}