import { MongoClient } from 'mongodb';
import { DB_URL } from '$env/static/private';

const client = new MongoClient(DB_URL);

export function start_mongo() {
    console.log('Starting MongoDB...');
    return client.connect();
}

export default client.db();