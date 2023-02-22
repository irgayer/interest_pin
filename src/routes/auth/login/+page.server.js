import { users } from '$db/users';
import { redirect } from '@sveltejs/kit';
import { comparePassword } from '../../../lib/auth/crypto';

export const load = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/posts');
	}
};

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (!email || !password) {
			return {
				status: 400,
				body: JSON.stringify({ message: 'Missing fields' }),
				success: false
			};
		}

		const existing = await users.findOne({ email });
		if (!comparePassword(password, existing.password)) {
			return {
				status: 400,
				body: JSON.stringify({ message: 'Incorrect email or password' }),
				success: false
			};
		}

		cookies.set('session', existing.user_token ,{
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 12 * 1,
		});

		throw redirect(302, '/posts');
	}
};
