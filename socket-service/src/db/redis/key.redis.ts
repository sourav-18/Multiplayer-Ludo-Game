const redisKey = {
    getSessionKey: (playerId:string):string=>"session:"+playerId,
    getRoomKey:(roomId:string):string=>"room:"+roomId
}

export default redisKey;