import { redirect } from '@sveltejs/kit';
import { users } from '$db/users';

export const actions = {
	register: async (event) => {
		const data = await event.request.formData();
		const email = data.get('email');
		const username = data.get('username');
		const password = data.get('password');

		if (!email || !username || !password) {
			return {
				status: 400,
				body: JSON.stringify({ message: 'Missing fields' }),
				success: false
			};
		}

		const existing = await users.findOne({ email });
		console.log(existing);
		if (existing) {
			return {
				status: 400,
				body: JSON.stringify({ message: 'User already exists' }),
				success: false
			};
		}

		users.insertOne({ email, username, password });

		return {
			status: 201,
			body: JSON.stringify({ message: 'User created' }),
			success: true
		};
	}
};
