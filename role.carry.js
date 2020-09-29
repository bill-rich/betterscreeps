module.exports = class {
  constructor(creep){
    this.creep = creep
  }

  find(){
    return util.findCreepsByRole("carry")
  }

  wanted(){
    return Math.floor(util.allSources().length/3)
  }

  run(creep){
    if(creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
      creep.memory.delivering = true
    }
    if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
      creep.memory.delivering = false
    }
    // If the creep isn't empty and its not currently delivering
    if(!creep.memory.delivering){
      if(!creep.memory.pickupTarget){
        let pickUpTarget = creep.pos.getClosesByPath(util.allFreeResources(), {
          filter: (source) => {
            (source.amount && source.amount > 0) || 
            (source.store && source.store.getUsedCapacite(RESOURCE_ENERGY) > 0)
          }
        })
        if(pickUpTarget.length > 0){
          creep.memory.pickupTarget = pickupTarget[0]
        }
      }
      if(creep.memory.pickupTarget){
        let target = Game.getObjectById(creep.memory.pickupTarget)
        let result = creep.pickup(target)
        if(result == ERR_NOT_IN_RANGE){
          creep.memory.dest = target.pos
        }
        if(target && (target.amount == 0 || (target.store && target.store.getFreeCapcity(RESOURCE_ENERGY) == 0))){
          creep.memory.target       = ""
          creep.memory.pickupTarget = ""
          creep.memory.dest = ""
        }
      }
    }
    // If the creep is ready to deliver
    if(creep.memory.delivering){
      // Find a target. First refill spawns and extensions, then builders
      if(!creep.memory.target){
        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (struct) => {
            if(!struct.store){
              return false
            }
            return (struct.structureType == STRUCTURE_SPAWN  ||
                    struct.structureType == STRUCTURE_EXTENSION) &&
                    struct.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                    !util.isTargeted(struct)
          }
        })
        if(target.length > 0){
          creep.memory.target = target[0].id
          creep.memory.dest = target[0].pos
        }
      }
      if(!creep.memory.target){
        creep.memory.target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
          filter: (creep) => {
            return ( creep.memory.role == "constructor" &&
                    creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                    !util.isTargeted(struct))
          }
        })[0]
      }
      if(creep.memory.target){
        let target = Game.getObjectById(creep.memory.target)
        let result = creep.transfer(target, RESOURCE_ENERGY)
        console.log(result)
        if(result == OK || target.store.getFreeCapacity(RESOURCE_ENERGY) == 0){
          creep.memory.dest = ""
          creep.memory.target = ""
        }
        if(result == ERR_NOT_IN_RANGE){
          creep.memory.dest = target.pos
        }
      }
    }
  }

  resourceTargeted(resource){
    for(let name in Game.creeps){
      let creep = Game.creeps[name]
      if(creep.memory.pickupTarget == resource.id) {
        return true
      }
    }
    return false
  }
}
