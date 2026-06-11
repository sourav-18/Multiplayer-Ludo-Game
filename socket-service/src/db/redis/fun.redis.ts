import client from "./client.redis.js";

export const get = async (key: string) => {
    let result = await client.get(key);
    if (result) {
        return result;
    } else {
        return null;
    }
}

export const set = async (key: string, value: string) => {
    let result = await client.set(key, value);
    if (result) {
        return result;
    }
    return false;
}

export default {
    get,
    set
}