import { updateText } from "./scripts/utils/updateText.js"
import { GameState } from "./scripts/classes/gameState.js";

const hints = [
    "The early bird catches the... burrito? Try Park 2 this hour.",
    "A yoga class just ended at Park 4. Expect a crowd hungry for green smoothies.",
    "Beware! Park 2 is attracting a swarm of toddlers. Deploy the mac and cheese truck!",
    "Park 2: Where fries are eaten faster than they can be made. Join the fry frenzy!",
    "A band just started playing at Park 4. Brace for a mosh pit at the taco truck!",
    "They say Park 3’s ice cream truck just ran out of cones. Time to bring some backup!",
    "Park 1 has a dog parade. Bring extra hot dogs – for the humans!",
    "Rumor has it Park 4 just ran out of napkins – prepare for sticky fingers!",
    "Park 1: The only place where people still believe fries count as a vegetable.",
    "Park 3: Where the line is always longer than the food supply.",
    "Reminder: Ice cream melts in Park 4 faster than decisions are made here.",
    "Park 2: Now with 20% more 'Oh, I thought this was the taco truck.'",
    "Park 3: Where every decision is just a very long wait in disguise.",
    "Park 4 is currently experiencing a 'We don’t have that' shortage.",
    "Rumor has it that Park 1 has WiFi. Also, people there occasionally buy food.",
    "Park 2: Serving the existentially hungry since... well, this hour.",
    "Park 4: Free napkins are limited, use sparingly or not at all.",
    "If lost, head to Park 3. You won’t find directions, but you will find people asking for them.",
    "Park 1: Now with 10% more food trucks and 90% more people wondering why.",
    "Someone at Park 2 asked for a salad. This was not well received.",
    "Park 4: Come for the food, stay because you’re still waiting for it.",
    "Park 3: Where every hot dog has a 50/50 chance of being the last one.",
    "Please note: The fries in Park 1 are now considered a limited edition.",
    "Park 4: Less a food experience, more an exercise in patience.",
    "Park 1 just got a new truck! No one knows what it serves yet.",
    "In Park 3, they say if you stare long enough, a truck might appear.",
];

const gameState = new GameState(true, hints);

updateText('final-day', gameState.numOfDays);

updateText('remaining-hours', gameState.numOfHours - gameState.currentHour);
updateText('current-day', gameState.currentDay + 1);





