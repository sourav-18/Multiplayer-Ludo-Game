import sql from "./index.js";



export const createRoomInDb = async (numberOfPlayer: number, userId: number) => {
    const newData = {
        number_of_player: numberOfPlayer,
        owner_id: userId,
    }
    const result = await sql`INSERT INTO rooms ${sql(newData)} RETURNING id`;
    if (result.length > 0) {
        return {
            error: false,
            message: 'Room created successfully',
            data: result[0]!.id
        }
    } else {
        return {
            error: true,
            message: 'Failed to create Room'
        }
    }
}

export const isAlreadyUserInGame = async (userId: number): Promise<Boolean> => {
    const status = ['pending', 'live'];

    const result = await sql`SELECT id FROM rooms WHERE owner_id=${userId} AND status IN ${sql(status)}`;
    if (result.length === 0) {
        return false
    } else {
        return true
    }
}
