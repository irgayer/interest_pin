import { redirect } from '@sveltejs/kit';
import { users } from '$db/users';
import { hashPassword } from '../../../lib/auth/crypto';

export const load = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/posts');
	}
};

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
		let dataToInsert = {
			email,
			username,
			password: await hashPassword(password),
			user_token: crypto.randomUUID()
		}
		users.insertOne(dataToInsert);

		throw redirect(302, '/auth/login');
	}
};
