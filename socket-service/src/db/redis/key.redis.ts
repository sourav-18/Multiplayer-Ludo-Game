const redisKey = {
    getSessionKey: (playerId:string):string=>"session:"+playerId
}

export default redisKey;