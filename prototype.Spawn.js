var roleMiner  = require('role.miner')
var roleRunner = require('role.runner')
var roleCarry = require('role.carry')
var roleConstructor = require('role.constructor')

global.miner =  new roleMiner()
global.runner = new roleRunner()
global.carry = new roleCarry()
global.constructor = new roleConstructor()

var MIN_ATTACKERS = 0


global.CREEP_TYPES = {
  carry: {
    body          : [CARRY],
    maxMultiplier : 9999,
    memory        : { role: "carry" },
    object        : carry
  },
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
  },
  constructor: {
    body          : [WORK,CARRY],
    maxMultiplier : 9999,
    memory        : { role: "constructor" },
    object        : constructor
  },
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
  _.forEach( CREEP_TYPES, (value, key, map) => {
    if(value["object"].find().length + Memory.globals.spawnQueue.filter(queue => queue == key) < value["object"].wanted()){
      Memory.globals.spawnQueue.push(key)
    }
  })
  if(Memory.globals.spawnQueue.length > 0){
    creepType = Memory.globals.spawnQueue.shift()
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


