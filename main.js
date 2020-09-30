require('util.functions')
require('prototype.Spawn')

module.exports.loop = function () {
  
  pruneMemory()
  setUpMemory()

  spawnTasks()
  creepTasks()

}

function creepTasks(){
  for(let creepType in CREEP_TYPES){
    for(let creep of CREEP_TYPES[creepType]["object"].find()){
      console.log(creep)
      CREEP_TYPES[creepType]["object"].run(creep)
    }
  }
}

function spawnTasks(){
  util.allSpawns().forEach( spawn => {
    if(spawn.spawnCreeps() != OK){
      console.log("Error Spawning: " + result)
    }
  })
}

function pruneMemory(){
  _.forEach(Memory.creeps, (memCreep, key) => {
    if(!Game.creeps[key]){
      console.log("deleting:" + key)
      delete Memory.creeps[key]
    }
  })
}

function setUpMemory() {
  let memoryArrays = [ "ignoreRoom", "enemyRoom", "allies", "spawnQueue" ]

  if(Memory.globals == undefined){
    Memory.globals = {}
  }

  memoryArrays.forEach(memItem => {
    if(eval("Memory.globals."+memItem) == undefined){
      eval("Memory.globals."+memItem+"=[]")
    }
  })
}
