class utilFunctions {
  constructor(){}

  allKnownRooms(){
    let rooms = []
    for(let roomName in Game.rooms){
      let room = Game.rooms[roomName]
      rooms.push(room)
    }
    return rooms
  }

  allFreeResources(){
    let resources = []
    for(let room of this.allKnownRooms()){
      let roomResources = room.find(FIND_DROPPED_RESOURCES)
      resources = resources.concat(roomResources)
    }
    return resources
  }

  allSources(){
    let sources = []
    for(let room of this.allKnownRooms()){
      let roomSources = room.find(FIND_SOURCES)
      sources = sources.concat(roomSources)
    }
    return sources
  }

  creepCost(body){
    let cost = 0
    for(let part of body){
      cost += BODYPART_COST[part]
    }
    return cost
  }

  allSpawns(){
    let allSpawns = []
    for(let room of this.allKnownRooms()){
      let spawns = room.find(FIND_STRUCTURES, {                                    
        filter: (struct) => {                                                      
          return (                                                                 
            struct.structureType == STRUCTURE_SPAWN &&                             
            struct.my                                                              
          )                                                                        
        }                                                                          
      })  
      allSpawns = allSpawns.concat(spawns)
    }
    return allSpawns
  }

  findCreepsByRole(role){
    let creeps = []
    for(let name in Game.creeps){
      let creep = Game.creeps[name]
      if(creep.memory.role == role){
        creeps.push(creep)
      }
    }
    return creeps
  }

  allMyControllers(){
    let allControllers = []
    for(let room of this.allKnownRooms()){
      let controllers = room.find(FIND_CONTROLLER, {                                    
        filter: (struct) => {                                                      
          return (                                                                 
            struct.my                                                              
          )                                                                        
        }                                                                          
      })  
      allControllers = allcontrollers.concat(controllers)
    }
    return allControllers
  }

  isTargeted(source){
    let count = 0
    for(let name in Game.creeps){
      let creep = Game.creeps[name]
      if(creep.memory.miningTarget == source.id){
        count++
      }
    }
    return count
  }

  isMiningTargeted(source){
    for(let name in Game.creeps){
      let creep = Game.creeps[name]
      if(creep.memory.miningTarget == source.id){
        return true
      }
    }
    return false
  }
}

global.util = new(utilFunctions)

