import { start_mongo } from '$db/mongo';

start_mongo().then(() => {
	console.log('mongo db started!');
});
