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
      sources.forEach(source => {
        let found = false
        if(!util.isMiningTargeted(source)){
          creep.memory.miningTarget = source.id
        }
      })
    } 
    let source = Game.getObjectById(creep.memory.miningTarget)
    if(creep.harvest(source) == ERR_NOT_IN_RANGE){
      creep.memory.dest = source.pos
    } else {
      creep.memory.dest = ""
    }
  }
}
