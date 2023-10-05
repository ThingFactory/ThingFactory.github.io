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
        this.thingsPerClickCost = this.cost * 10;
        this.costMultiplyer = 1.1;
        this.costMultiplyerMultiplyer = 1.001;
        this.thingName = "Potatoes"
        this.thingsPerClick = 1;
    }
    UpdateName(name){
        this.thingName = name;
    }
    Make(){
        this.thingsToAdd += this.thingsPerClick;
    }
    BuyAuto(){
        if(this.total >= this.cost){  
            this.total -= this.cost;
            this.thingsPerSecond++;
            this.cost = Math.round(this.cost * this.costMultiplyer);
            this.costMultiplyer = this.costMultiplyer * this.costMultiplyerMultiplyer;
        }
    }
    BuyManual(){
        if(this.total >= this.thingsPerClickCost){  
            this.total -= this.thingsPerClickCost;
            this.thingsPerClick++;
            this.thingsPerClickCost = Math.round(this.thingsPerClickCost * this.costMultiplyer);
            this.costMultiplyer = this.costMultiplyer * this.costMultiplyerMultiplyer;
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
            thingName: this.thingName,
            thingsPerClickCost: this.thingsPerClickCost,
            thingsPerClick: this.thingsPerClick
        });
    }
}