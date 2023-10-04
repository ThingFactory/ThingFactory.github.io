export class Factory {
    constructor(onUpdate){
        this.startedAt = new Date();
        this.total = 0;
        this.thingsPerSecond = 1.00;
        this.thingsToAdd = 0;
        this.onUpdate = onUpdate;
        this.lastUpdate = this.startedAt;
        this.cost = 10;
        this.costMultiplyer = 1.1;
    }
    Make(){
        this.thingsToAdd ++;
    }
    Buy(){
        if(this.total >= this.cost){  
            this.total -= this.cost;
            this.thingsPerSecond++;
            this.cost = Math.round(this.cost * this.costMultiplyer);
            this.costMultiplyer = this.costMultiplyer * 1.1;
        }
    }
    Update(){
        const now = new Date();
        const timeSinceLastUpdate = now - this.lastUpdate;
        this.lastUpdate = now;
        this.total += ((this.thingsPerSecond/1000) * timeSinceLastUpdate)
        this.total += this.thingsToAdd;
        this.thingsToAdd = 0;
        this.onUpdate({
            total: this.total,
            cost: this.cost,
            thingsPerSecond: this.thingsPerSecond
        });
    }
}