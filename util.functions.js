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
}

global.util = new(utilFunctions)

