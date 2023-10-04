export class Factory {
    constructor(onUpdate){
        this.startedAt = new Date();
        this.allTimeTotal = 0;
        this.total = 0;
        this.thingsPerSecond = 0.00;
        this.thingsToAdd = 0;
        this.onUpdate = onUpdate;
        this.lastUpdate = this.startedAt;
        this.cost = 10;
        this.costMultiplyer = 1.1;
        this.thingName = "Potatoes"
    }
    UpdateName(name){
        this.thingName = name;
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
        const increment = ((this.thingsPerSecond/1000) * timeSinceLastUpdate) + this.thingsToAdd;
        this.total += increment;
        this.allTimeTotal += increment;
        this.thingsToAdd = 0;
        this.onUpdate({
            total: this.total,
            allTimeTotal: this.allTimeTotal,
            cost: this.cost,
            thingsPerSecond: this.thingsPerSecond,
            thingName: this.thingName
        });
    }
}