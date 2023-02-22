import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    let data = {
        hash: await bcrypt.hash(password, 10),
        user_token: crypto.randomUUID()
    }
    return await bcrypt.hash(password, 10);
}

export async function comparePassword(password, hash) {
    const result = await bcrypt.compare(password, hash);
    if (!result) {
        return false;
    }

    return true;
}