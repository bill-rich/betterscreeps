module.exports = class {
  constructor(creep){
    this.creep = creep
  }

  find(){
    return util.findCreepsByRole("runner")
  }

  wanted(){
    return 2
  }

  run(creep){
    let currentTarget = Game.getObjectById(creep.memory.towTarget)
    if(currentTarget && !currentTarget.memory.dest){
      creep.memory.towTarget = ""
    }
    if(!creep.memory.towTarget){
      for(let name in Game.creeps){
        let target = Game.creeps[name]
        if(target.memory.dest && !this.creepTowed(target)){
          creep.memory.towTarget = target.id
        }
      }
    }
    if(creep.memory.towTarget){
      let target = Game.getObjectById(creep.memory.towTarget)
			if(creep.pull(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			} else {
				target.move(creep);
				let targetDest = new RoomPosition(target.memory.dest.x, target.memory.dest.y, target.memory.dest.roomName)
				if(creep.pos.isNearTo(targetDest)) {
					creep.move(creep.pos.getDirectionTo(target));
				} else {
					creep.moveTo(targetDest);
				}
			}
		}
  }

  creepTowed(creep){
    for(let runner of this.find()){
      if(runner.towTarget == creep.id){
        return true
        break
      }
    }
    return false
  }
}

