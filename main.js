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
      CREEP_TYPES[creepType]["object"].run(creep)
    }
  }
}

function spawnTasks(){
  for(let spawn of util.allSpawns()){
    let result = spawn.spawnCreeps()
    if(result != OK){
      console.log("Error Spawning: " + result)
    }
  }
}

function pruneMemory(){
  for(let memCreep in Memory.creeps){
    if(!Game.creeps[memCreep]){
      console.log("deleting:" + memCreep)
      delete Memory.creeps[memCreep]
    }
  }
}

function setUpMemory() {
  let memoryArrays = [ "ignoreRoom", "enemyRoom", "allies" ]

  if(Memory.globals == undefined){
    Memory.globals = {}
  }

  for(let memItem of memoryArrays){
    if(eval("Memory.globals."+memItem) == undefined){
      eval("Memory.globals."+memItem+"=[]")
    }
  }
}
