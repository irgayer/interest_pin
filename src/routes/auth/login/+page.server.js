import { users } from "$db/users";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            return {
                status: 400,
                body: JSON.stringify({ message: 'Missing fields' }),
                success: false
            }
        }

        const existing = await users.findOne({email});
        if (existing.password !== password) {
            return {
                status: 400,
                body: JSON.stringify({ message: 'Incorrect email or password' }),
                success: false
            }
        }

        cookies.set('access', 'true', {
            path: '/',
            sameSite: 'strict'
        });

        throw redirect('/posts', 302);


        return {
            status: 200,
            body: JSON.stringify({ message: 'Logged in' }),
            success: true
        }

    }
}