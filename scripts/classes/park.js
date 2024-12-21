import { randomInteger } from "../utils/randomInteger.js";

export class Park {    
    static numOfParks = 0;

    static incrementNumOfParks() {
        this.numOfParks++;
    }
    
    constructor (randomize, numOfDays, numOfHours, numOfPeople=[], numOfFoodTrucks=[]) {
        this.constructor.numOfParks++;
        this.name = "Park " + this.constructor.numOfParks;
        this.numOfPeople = numOfPeople;
        this.numOfFoodTrucks = numOfFoodTrucks;

        // Randomly populate park with customers and food trucks
        if (randomize) {
            this.numOfPeople = [];
            this.numOfFoodTrucks = [];

            let newnumOfPeople = [];
            let newNumOfFoodTrucks = [];
            
            // Randomly determine how many customers and food trucks will arrive at each hour
            for (let i = 0; i < numOfHours * numOfDays; i++) {
                newnumOfPeople.push(randomInteger(1, 100));
                newNumOfFoodTrucks.push(randomInteger(1, 10));
                
                // The start of a new day
                if ((i + 1) % numOfHours == 0) {
                    this.numOfPeople.push(newnumOfPeople);
                    this.numOfFoodTrucks.push(newNumOfFoodTrucks);
                    newnumOfPeople = [];
                    newNumOfFoodTrucks = [];
                }
            }
        }
    }

    getNumOfPeople(day, hour) {
        return this.numOfPeople[day][hour];
    }

    getNumOfFoodTrucks(day, hour) {
        return this.numOfFoodTrucks[day][hour];
    }

    getNumOfFoodTrucksMoving(day, hour) {
        if ((day < 0) || (hour < 0) || (day == 0 && hour == 0) || (this.numOfHours - hour == 0)) {
            return "edge case";
        }

        return this.numOfFoodTrucks[day][hour + 1] - this.numOfFoodTrucks[day][hour];
    }
}