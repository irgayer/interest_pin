import {users} from '$db/users';

export async function isUserExists(userId) {
    let data = await users.findOne({ _id: userId })

    if (!data) {
        return false;
    }

    return true;
}

export async function getAllUserData(userId) {
    let data = await users.findOne({_id: userId}, {username: 1});

    return data;
}