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
    let currentTarget = Game.getObjectById(creep.memory.target)
    if(currentTarget && !currentTarget.memory.dest){
      creep.memory.target = ""
    }
    if(!creep.memory.target){
      creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        filter: (towCreep) => {
          return (!util.isTargeted(towCreep) &&
                  creep.memory.dest
          )
        }
      })
    }
    if(creep.memory.target){
      let target = Game.getObjectById(creep.memory.target)
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
}

