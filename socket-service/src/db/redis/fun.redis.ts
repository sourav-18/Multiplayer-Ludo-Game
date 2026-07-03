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

export const setLock = async (key: string) => {
    key = key + "-lock";
    let result = await client.setNX(key, "1");
    while (!result) {
        await new Promise(resolve => setTimeout(resolve, 100));
        result = await client.setNX(key, "1");
    }
    return true;
}

export const releaseLock = async (key:string) => {
    key = key + "-lock";
    await client.del(key);
    return true;
}

const redisFun = {
    get,
    set,
    setLock,
    releaseLock
}
export default redisFun;