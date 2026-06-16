import sql from "./index.js";

export enum UserType {
    guest = "guest",
    user = "user"
}

export const createUserDb = async (userType: UserType = UserType.guest) => {
    const newData = {
        user_type: userType
    }
    const result = await sql`INSERT INTO users ${sql(newData)} RETURNING id`;
    if (result.length > 0) {
        return {
            error: false,
            message: 'User created successfully',
            data: result[0]!.id
        }
    } else {
        return {
            error: true,
            message: 'Failed to create user'
        }
    }
}

