import { start_mongo } from '$db/mongo';
import {users} from '$db/users';

start_mongo().then(() => {
	console.log('mongo db started!');
});
export const handle = async ({ event, resolve }) => {
    console.log('handle')
    const session = event.cookies.get('session');

    if (!session) {
        return await resolve(event);
    }

    const user = await users.findOne({ user_token: session }, {username: 1});

    if (user)
    {
        event.locals.user = {
            username: user.username
        }
    }

    return await resolve(event);
}