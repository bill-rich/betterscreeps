module.exports = class {
  constructor(creep){
    this.creep = creep
  }

  find(){
    return util.findCreepsByRole("miner")
  }

  wanted(){
    return util.allSources().length
  }

  run(creep){
    if(!creep.memory.miningTarget){
      let sources = _.sortBy(util.allSources(), source => source.pos.getRangeTo(creep.pos))
      for(let source of sources){
        let found = false
        for(let name in Game.creeps){
          let creep = Game.creeps[name]
          if(creep.memory.miningTarget == source.id){
            found = true
            break
          }
        }
        if(!found){
          creep.memory.miningTarget = source.id
        }
      }
    } 
    let source = Game.getObjectById(creep.memory.miningTarget)
    if(creep.harvest(source) == ERR_NOT_IN_RANGE){
      creep.memory.dest = source.pos
    } else {
      creep.memory.dest = ""
    }
  }
}
