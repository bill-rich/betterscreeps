module.exports = class {
  constructor(creep){
    this.creep = creep
  }

  find(){
    return util.findCreepsByRole("constructor")
  }

  wanted(){
    return 1
  }

  run(creep){
    let target = Game.getObjectById(creep.memory.target)
    if(!target){
      creep.memory.target = ""
    }
    let sites = _.sortBy(Game.costructionSites, site => site.getRangeTo(creep))
    if(sites.length > 0){
      creep.memory.target = sites[0].id
    }
    if(!creep.memory.target){
      let controllers = _.sortBy(util.allMyControllers(), controller => util.isTargeted(controller))
      creep.memory.target = controllers[0].id
    }
    target = Game.getObjectById(creep.memory.target)
    let result = ""
    if(target && target.structureType == STRUCTURE_CONTROLLER){
      result = creep.upgradeController(target)
    } else if(target) {
      result = creep.build(target)
    }
    console.log(result)
    if(result == ERR_NOT_IN_RANGE) {
      creep.memory.dest = target.pos
    }
    if(result == OK ) {
      creep.memory.dest = ""
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
