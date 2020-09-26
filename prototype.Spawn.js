var roleMiner  = require('role.miner')
var roleRunner = require('role.runner')

global.miner =  new roleMiner()
global.runner = new roleRunner()

var MIN_ATTACKERS = 0


global.CREEP_TYPES = {
  miner: {
    body          : [WORK],
    maxMultiplier : 5,
    memory        : { role: "miner" },
    object        : miner
  },
  runner: {
    body          : [MOVE],
    maxMultiplier : 9999,
    memory        : { role: "runner" },
    object        : runner
  }
}

StructureSpawn.prototype.spawnCreeps = function() {
  let finalResult = OK
  for(let creepType in CREEP_TYPES){
    try{
      let result = this.spawn(creepType) 
      if(result != OK){
        finalResult = result
      }
    } catch(err){
      console.log(err)
    }
  }
  return finalResult
}

StructureSpawn.prototype.spawn = function(creepType) {
  if(CREEP_TYPES[creepType]["object"].find().length < CREEP_TYPES[creepType]["object"].wanted()){
    let energyAvailable = this.room.energyAvailable
    let energyCapacity  = this.room.energyCapacityAvailable
    let bodyUnit        = CREEP_TYPES[creepType]["body"]
    let bodyUnitCost    = util.creepCost(bodyUnit)
    let bodyMax         = CREEP_TYPES[creepType]["maxMultiplier"]
    let bodyMultiplier  = Math.min(Math.floor(energyCapacity/bodyUnitCost), bodyMax)
    let memory          = CREEP_TYPES[creepType]["memory"]
    let name            = creepType + Game.time

    let body = []
    for(let i=1; i <= bodyMultiplier; i++){
      body = body.concat(bodyUnit)
    }
    if(util.creepCost(body) > energyAvailable) {
      return OK
    }
    console.log("spawning " + name)
    return this.spawnCreep(body, name, { memory: memory })
  }
  return OK
}


