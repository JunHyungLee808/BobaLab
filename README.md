# Food Truck Simulator

Welcome to **Food Truck Simulator**, a simple browser-based simulation game where you strategically manage a food truck business across multiple parks and days. This README will guide you through the file structure, how to adjust game settings, and how to deploy the project.

## Table of Contents
1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Key Files Explained](#key-files-explained)
    - [scripts/classes/gameState.js](#gamestatejs)
    - [scripts/classes/park.js](#parkjs)
    - [scripts/utils/hide.js](#hidejs)
    - [scripts/utils/show.js](#showjs)
    - [scripts/utils/updateText.js](#updatetextjs)
    - [scripts/utils/randomInteger.js](#randomintegerjs)
    - [scripts/memoryGame.js](#memorygamejs)
    - [index.html](#indexhtml)
    - [index.js](#indexjs)
4. [How to Adjust Game Settings](#how-to-adjust-game-settings)
5. [Running Locally](#running-locally)
6. [Deployment](#deployment)
7. [Additional Notes](#additional-notes)

---

## Overview

**Food Truck Simulator** is a browser-based game that simulates managing food trucks across different parks and days. Players:
- Choose which park to visit based on hints.
- Serve customers in a short “memory game” mini-challenge.
- Earn profits based on performance.
- Progress through multiple days and track total profits.

The game uses vanilla JavaScript, HTML, and CSS. No external frameworks are required, though it does rely on ES modules.

---

## Project Structure

A simplified version of the folder structure is:


- **index.html**: Main HTML file containing the game layout and UI elements.
- **index.js**: Entry point that initializes the game.
- **styles.css**: CSS styling.
- **scripts/classes/**: Contains core classes (`gameState.js`, `park.js`).
- **scripts/utils/**: Collection of utility functions (`hide.js`, `show.js`, `updateText.js`, `randomInteger.js`).
- **scripts/memoryGame.js**: Logic for the mini memory game.

---

## Key Files Explained

### `gameState.js`
- **Location**: `scripts/classes/gameState.js`
- **Purpose**: Manages the overall game state: which park you’re in, the current day and hour, total profits, and handles transitions between days/hours.
- **Key Points**:
  - **Constructor** takes parameters: 
    - `randomize` (boolean): Randomly generate people/food trucks or use provided arrays.
    - `hints` (array): Tips displayed to the player.
    - `numOfParks`, `numOfDays`, `numOfHours`: Adjust how large the game is.
    - Optional arrays for preset `numOfPeople` and `numOfFoodTrucks`.
  - **createMenu()**: Dynamically creates UI elements such as park buttons, history log, observation text, etc.
  - **displayNumberOfMovingTrucks()**: Shows how many trucks are arriving or leaving.
  - **generateProfit()**: Calculates profit based on how many attempts were made in the memory game and how many customers are at the current park.
  - **nextDay()**: Moves the game to the next day or ends the game if the final day is reached.
  - **endGame()**: Displays a final “GAME OVER” message and ends the simulation.
  - **generateHint()**: Randomly selects and displays a hint from the provided `hints` array.

### `park.js`
- **Location**: `scripts/classes/park.js`
- **Purpose**: Represents an individual park in the simulation.
- **Key Points**:
  - Stores the number of people (`numOfPeople`) and number of food trucks (`numOfFoodTrucks`) for each hour of each day.
  - If `randomize` is `true`, it randomly generates these values.
  - Methods like `getNumOfPeople()` and `getNumOfFoodTrucks()` fetch the respective values for a given day and hour.

### `hide.js`
- **Location**: `scripts/utils/hide.js`
- **Purpose**: Utility function to hide a DOM element (by adding a `no-display` class).

### `show.js`
- **Location**: `scripts/utils/show.js`
- **Purpose**: Utility function to show a previously hidden DOM element (by removing the `no-display` class).

### `updateText.js`
- **Location**: `scripts/utils/updateText.js`
- **Purpose**: Updates the `textContent` of a DOM element (used for dynamic text updates like profits, day/hour indicators, etc.).

### `randomInteger.js`
- **Location**: `scripts/utils/randomInteger.js`
- **Purpose**: Generates a random integer between the specified bounds (inclusive).

### `memoryGame.js`
- **Location**: `scripts/memoryGame.js`
- **Purpose**: A mini memory game that triggers each time you arrive at a park to serve customers. 
- **Key Points**:
  - **startMemoryGame()**: 
    - Displays a random sequence of food items for the player to memorize.
    - Presents buttons for the player to recreate the sequence.
    - If the player fails, they can retry a limited number of times before success is forced.
    - Calls a callback (`onSuccess`) when the player finishes (successfully or otherwise).

### `index.html`
- **Purpose**: The main HTML structure of the game.
- **Key Sections**:
  - **Header**: Displays current profit, park status, and time indicators (day/hour).
  - **Main**: Includes a `flexbox-container` for the history log on one side and the map/park buttons on the other.

### `index.js`
- **Purpose**: The main entry point for the game.
- **How it works**:
  1. Imports `updateText` and `GameState`.
  2. Defines an array of `hints`.
  3. Instantiates a new `GameState` with `randomize = true` and the `hints`.
  4. Updates HTML elements (day indicator, remaining hours, etc.) to initialize the game UI.

---

## How to Adjust Game Settings

1. **Randomization**: 
   - If you want the number of customers (`numOfPeople`) and food trucks (`numOfFoodTrucks`) to be randomly generated, keep `randomize = true` when creating `GameState`.  
   - If you want to provide your own datasets, pass arrays of numbers for each park into the `GameState` constructor and set `randomize = false`.

2. **Number of Parks, Days, and Hours**:
   - `GameState` constructor parameters include `numOfParks`, `numOfDays`, and `numOfHours`.
   - Example: `new GameState(true, hints, 3, 7, 6)` would create a simulation with:
     - 3 parks
     - 7 days
     - 6 hours per day

3. **Hints**:
   - You can add, remove, or edit hint strings in the `hints` array in **index.js**.

4. **Profit Calculation**:
   - Modify the logic in `generateProfit()` within **gameState.js** to change how profit is calculated if desired.

5. **Memory Game Difficulty**:
   - Inside **memoryGame.js**, you can adjust the logic for `sequenceLength`, which determines how many items the player must memorize.

---

## Running Locally

1. **Clone or Download** this repository.
2. **Open `index.html`** in a modern web browser. 
     Then visit `http://localhost:8080/` (or whichever port is shown).

3. Start playing! The game will initialize with default settings.

---

## Deployment

Since this project is purely front-end (HTML, CSS, JS), you can deploy it easily on static hosting platforms such as:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **AWS S3** (static website hosting)

Simply upload the files (including the `scripts` folder, `styles.css`, `index.html`, and `index.js`) to your hosting provider.

---

## Additional Notes

- **Images for Food Items**: In the `memoryGame.js`, each memory item references an `images/` folder. Make sure the folder structure and image names match, or replace those references with your own images.
- **Styling**: Customize `styles.css` to change the look of the game, or modify any of the classes used in the utility functions (`no-display`, etc.).
- **Browser Compatibility**: This game uses ES modules and modern DOM APIs, so it’s best played in up-to-date browsers like Chrome, Firefox, Edge, or Safari.

Enjoy playing **Food Truck Simulator** and feel free to adapt it to your own needs!
