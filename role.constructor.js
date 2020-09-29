module.exports = class {
  constructor(creep){
    this.creep = creep
  }

  find(){
    return util.findCreepsByRole("constructor")
  }

  wanted(){
    1
  }

  run(creep){
    let target = Game.getObjectById(creep.memory.target)
    if(!target){
      creep.memory.target = ""
    }
    let sites = _.sortBy(Game.costructionSites, site => site.getRangeTo(creep))
    if(sites){
      creep.memory.target = sites[0].id
    }
    if(!creep.memory.target){
      let controllers = _.sortBy(util.allMyControllers(), controller => util.isTargeted(controller))
      creep.memory.target = controllers[0]
    }
    target = Game.getObjectById(creep.memory.target)
    let result = ""
    if(target.structureType = STRUCTURE_CONTROLLER){
      result = creep.upgrade(target)
    } else if(target) {
      result = creep.build(target)
    }
    if(result = ERR_NOT_IN_RANGE) {
      dest = target.pos
    }
    if(result = OK ) {
      dest = ""
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
