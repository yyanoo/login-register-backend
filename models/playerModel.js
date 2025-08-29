export class Player {
  constructor(playerid, gold, itemid = []) {
    this.playerid = playerid;
    this.gold = gold;
    this.itemid = [...itemid];
  }

  getInfo() {
    return {
      playerid: this.playerid,
      gold: this.gold,
      item: this.itemid,
    };
  }
}

export let players = [];
