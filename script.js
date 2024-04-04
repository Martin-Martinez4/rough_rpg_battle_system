import { Attack } from "./models/Attacks.js";
import {JackFrost, JackOLantern, Impundulu} from "./enemies.js";


/* 
    The game will be small so inheritance is fine
*/
const jackieFrost = new JackFrost(2);
const jackieFrost20 = new JackFrost(20);
const jackieFrost21 = new JackFrost(21);
const jackieFrost25 = new JackFrost(25);
const jackieFrost29 = new JackFrost(29);
const jackieFrost30 = new JackFrost(30);
const jackieFrost200 = new JackFrost(200);
const jackieFrost201 = new JackFrost(201);

console.log("lv 20 attacks lv 21");
jackieFrost20.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost21);
jackieFrost20.showStats();

console.log("lv 200 attacks lv 201");
jackieFrost200.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost201);
jackieFrost200.showStats();
jackieFrost200.attackTarget({name: "lighting", element: "fire", power: 10, type: Attack.magic }, jackieFrost201);
jackieFrost200.showStats();

console.log("lv 200 attacks lv 20");
jackieFrost200.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost20);
jackieFrost200.showStats();

console.log("lv 20 attacks lv 200");
jackieFrost20.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost200);
jackieFrost20.showStats();

console.log("lv 30 attacks lv 20");
jackieFrost30.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost20);
jackieFrost20.showStats();

console.log("lv 30 attacks lv 25");
jackieFrost30.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost25);
jackieFrost25.showStats();

console.log("lv 30 attacks lv 29");
jackieFrost30.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost29);
jackieFrost29.showStats();

console.log("lv 30 attacks lv 30");
jackieFrost30.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost30);
jackieFrost30.showStats();

console.log("\nLevel Up")
jackieFrost.showStats();
jackieFrost.levelUp();
jackieFrost.showStats();

const jackLantern = new JackOLantern(2);

jackLantern.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost);
jackieFrost.attackTarget({name: "fire", element: "fire", power: 10, type: Attack.magic }, jackieFrost);


const impundulu = new Impundulu(2);
impundulu.showStats();





