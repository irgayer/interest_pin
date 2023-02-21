import db from '$db/mongo';

export const posts = db.collection('posts');