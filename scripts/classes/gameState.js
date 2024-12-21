import { randomInteger } from "../utils/randomInteger.js";
import { hide } from "../utils/hide.js";
import { show } from "../utils/show.js";
import { updateText } from "../utils/updateText.js";
import { Park } from "./park.js";
import { startMemoryGame } from "../memoryGame.js";

export class GameState {
    constructor (randomize, hints=[], numOfParks=4, numOfDays=5, numOfHours=8, numOfPeople=[], numOfFoodTrucks=[]) {
        this.numOfParks = numOfParks;
        this.numOfDays = numOfDays;
        this.numOfHours = numOfHours;
        this.currentPark = null;
        this.profits = 0;
        this.parks = [];    
        this.currentDay = 0;
        this.currentHour = 0;
        this.qualtricsString = '';
        this.prevTime = 0;
        this.hints = hints;
        this.dayListItems = {};
        this.eventLists = {};  

        for (let i = 0; i < numOfParks; i++) {
            let newPark;

            if (randomize) {
                newPark = new Park(randomize, numOfDays, numOfHours);
            } else {
                newPark = new Park(randomize, numOfDays, numOfHours, numOfPeople[i], numOfFoodTrucks[i]);
            }

            this.parks.push(newPark);
        }

        this.currentPark = this.parks[0];
        this.createMenu();
    }

    displayNumberOfMovingTrucks(isArriving) {
        const observationTextContainer = document.getElementById('observation-text-container');
        const observationDescriptionText = document.getElementById('observation-description-text');
        const arrivalText = document.getElementById('arrival-text');
        const departureText = document.getElementById('departure-text');

        if ((this.currentDay == 0 && this.currentHour == 0) || (this.numOfHours - this.currentHour == 0) || this.currentDay < 0 || this.currentHour < 0) {
            hide(observationTextContainer);
            return;
        }

        const currNumOfFoodTrucks = this.currentPark.getNumOfFoodTrucks(this.currentDay, this.currentHour);
        let numOfMovingFoodTrucks;
        let diff;

        if (isArriving) {
            numOfMovingFoodTrucks = this.currentPark.getNumOfFoodTrucks(this.currentDay, this.currentHour - 1);
        } else {
            numOfMovingFoodTrucks = this.currentPark.getNumOfFoodTrucks(this.currentDay, this.currentHour + 1);
        }
        
        let numOfArrivingFoodTrucks = 0;
        let numOfLeavingFoodTrucks = 0;
        diff = numOfMovingFoodTrucks - currNumOfFoodTrucks;

        if (isArriving) {
            diff *= -1;
        } 

        if (diff < 0) {
            numOfArrivingFoodTrucks = 0;
            numOfLeavingFoodTrucks = diff * -1;
        } 

        else if (diff > 0) {
            numOfArrivingFoodTrucks = diff;
            numOfLeavingFoodTrucks = 0;
        }

        if (!isArriving) {
            console.log('diff: ' + diff)
            console.log('numofmovingfoodtruck: ' + numOfMovingFoodTrucks)
            console.log('curr: ' + currNumOfFoodTrucks)
        }

        if (isArriving) {
            observationDescriptionText.textContent = "As you arrive at the park you notice the following:";
        } else {
            observationDescriptionText.textContent = "As you decide where to go next you notice the following:";
        }

        arrivalText.textContent = "Trucks Arriving at Park: " + numOfArrivingFoodTrucks + "\n" 
        departureText.textContent = "Trucks Leaving Park: " + numOfLeavingFoodTrucks + "\n";
    }

    // Creates the game's menu
    createMenu() {
        const hintText = document.getElementById('hint');
        const mapContainer = document.getElementById('map');
        const profitGainsText = document.getElementById('profit-gains');
        const historyContainer = document.getElementById('history-container');

        // Create history header
        const historyContainerHeader = document.createElement('h2');
        historyContainerHeader.textContent = "History:";
        historyContainer.appendChild(historyContainerHeader);

        // Create history list
        const historyList = document.createElement('ul');
        historyList.id = 'history-list';
        historyContainer.appendChild(historyList);

        // Create decision header
        const buttonContainerHeader = document.createElement('h2');
        buttonContainerHeader.textContent = "Choose which park to travel to...";
        mapContainer.appendChild(buttonContainerHeader);

        // Create arriving and leaving text
        const observationTextContainer = document.createElement('div');
        observationTextContainer.id = 'observation-text-container'
        const observationDescriptionText = document.createElement('p');
        observationDescriptionText.id = 'observation-description-text'
        const arrivalText = document.createElement('p');
        arrivalText.id = 'arrival-text';
        const departureText = document.createElement('p');
        departureText.id = 'departure-text';
        mapContainer.appendChild(observationTextContainer);
        observationTextContainer.appendChild(observationDescriptionText);
        observationTextContainer.appendChild(arrivalText);
        observationTextContainer.appendChild(departureText);
        show(observationTextContainer);

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'button-container';
        mapContainer.appendChild(buttonContainer);

        // Create start minigame button
        const startMinigameButton = document.createElement('button');
        buttonContainer.appendChild(startMinigameButton);
        startMinigameButton.textContent = 'Begin serving food!';
        startMinigameButton.id = 'minigame-start-button';
        hide(startMinigameButton);
        
        // Create continue button
        const continueButton = document.createElement('button');
        continueButton.id = 'continue-button';
        continueButton.textContent = 'Start a new day!';
        hide(continueButton);
        mapContainer.appendChild(continueButton);

        // Creates Park buttons
        for (let i = 0; i < this.numOfParks; i++) {
            let button = document.createElement("button");
            buttonContainer.appendChild(button);     
            button.textContent = this.parks[i].name;
            button.classList.add('park-button');

            let image = document.createElement("image");
            image.classList.add('park-icon');
            button.appendChild(image);

            button.addEventListener("click", () =>  {
                // Update current park
                this.currentPark = this.parks[i];
                this.displayNumberOfMovingTrucks(true);
                
                const allParkButtons = document.querySelectorAll('.park-button');
                allParkButtons.forEach(button => {
                    hide(button);
                });

                buttonContainerHeader.textContent = "Arriving at " + this.currentPark.name;
                show(observationTextContainer);
                show(startMinigameButton);
            })
        }

        // Creates Continue button
        continueButton.addEventListener("click", () => {
            if (this.nextDay()) {
                hide(profitGainsText);
                show(buttonContainerHeader);
                show(buttonContainer);
                hide(continueButton);
            } else {
                hide(continueButton);
            }
        })

        startMinigameButton.addEventListener("click", () => {
            hide(startMinigameButton);
            hide(observationTextContainer);
            buttonContainerHeader.textContent = "Memorize the customer's orders...";

            // Get number of customers at this park, current day and hour
            const numOfPeople = this.currentPark.getNumOfPeople(this.currentDay, this.currentHour);
            const numOfFoodTrucks = this.currentPark.getNumOfFoodTrucks(this.currentDay, this.currentHour);

            startMemoryGame(numOfPeople, numOfFoodTrucks, mapContainer, (attempts) => {
                this.generateProfit(this.currentDay, this.currentHour, attempts);
                buttonContainerHeader.textContent = "Decision for the next hour:"; 
                this.generateHint();
                show(profitGainsText);
                show(hintText);

                // Start of a new day
                if (this.numOfHours - this.currentHour == 0) {
                    show(continueButton);
                    hide(observationTextContainer);
                    hide(buttonContainerHeader);
                    hide(buttonContainer);
                    hide(hintText);
                } else {
                    this.displayNumberOfMovingTrucks(false);
                    show(observationTextContainer);
                }
                
                this.currentHour++;
                updateText('current-day', this.currentDay + 1);
                updateText('remaining-hours', this.numOfHours - this.currentHour);
                const allParkButtons = document.querySelectorAll('.park-button');
                allParkButtons.forEach(button => {
                    show(button);
                });
            })
        })
    }

    // Returns true when there is a new day and false otherwise
    nextDay() {
        this.currentHour = 0;
        this.currentDay++;

        // End of the game
        if (this.currentDay >= this.numOfDays) {
            this.currentDay = this.numOfDays - 1;
            this.endGame();
            return false;
        }

        updateText('current-park', 'Home');
        updateText('number-of-people', '');
        updateText('number-of-food-trucks', '');
        updateText('current-day', this.currentDay + 1);
        updateText('remaining-hours', this.numOfHours - this.currentHour);

        return true;
    }

    generateProfit(day=this.currentDay, hour=this.currentHour, attempts) {
        const historyList = document.getElementById('history-list');
        const numOfPeople = this.currentPark.getNumOfPeople(day, hour);
        const numOfFoodTrucks = this.currentPark.getNumOfFoodTrucks(day, hour);
        const numOfCustomers = Math.max(1, randomInteger(-2, 4) + Math.ceil(numOfPeople / (numOfFoodTrucks + 1)));
        
        let profitsFromHour = numOfCustomers * randomInteger(8, 25);
        profitsFromHour -= profitsFromHour * 0.25 * attempts;
        this.profits += profitsFromHour;

        // Format the event text
        const eventText = `H${this.currentHour + 1}: Profited $${profitsFromHour} at ${this.currentPark.name}. There were ${numOfPeople} people and ${numOfFoodTrucks} trucks.`;

        // Manage history entries
        let dayNumber = this.currentDay + 1;
        let dayListItem = this.dayListItems[dayNumber];

        if (!dayListItem) {
            // Create a new main bullet point for the day
            dayListItem = document.createElement('li');
            dayListItem.textContent = `Day ${dayNumber}`;

            // Create a sub-list for events under this day
            let eventList = document.createElement('ul');
            dayListItem.appendChild(eventList);

            // Insert the day list item at the top of the history list
            historyList.insertBefore(dayListItem, historyList.firstChild);

            // Store references
            this.dayListItems[dayNumber] = dayListItem;
            this.eventLists[dayNumber] = eventList;
        }

        // Create a new event list item
        const eventListItem = document.createElement('li');
        eventListItem.textContent = eventText;

        // Insert the event at the top of the day's event list
        const eventList = this.eventLists[dayNumber];
        eventList.insertBefore(eventListItem, eventList.firstChild);

        // Scroll to the top of the history container
        const historyContainer = document.getElementById('history-container');
        historyContainer.scrollTop = 0;

        updateText('current-park', this.currentPark.name);
        updateText('profit-gains', `You gained $${profitsFromHour}`);
        updateText('current-profit', this.profits);
        updateText('number-of-people', `Number of Customers: ${numOfPeople}`);
        updateText('number-of-food-trucks', `Number of Food Trucks: ${numOfFoodTrucks}`);
    }

    endGame() {
        updateText('current-park', 'GAME OVER');
        updateText('number-of-people', 'Thanks for playing!');
        updateText('number-of-food-trucks', '');
        updateText('profit-gains', '');
    }

    generateHint() {
        var randomIndex = randomInteger(0, this.hints.length - 1);
        updateText("hint", this.hints[randomIndex]);
    }
}
