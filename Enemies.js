import {BaseCombatant} from "./models/BaseCombatant.js";
import { BaseResistances } from "./models/BaseStats.js";


// Create new enemy types at least 20
// Create skills 20
// Assign skills under actions
// Defines what happens when base actions are taken
// items


export class JackFrost extends BaseCombatant{
    constructor(level){
        super(
            "Jack Frost", 
            level, 
            0, 
            {health: 30, strength: 5, defense: 5, magic: 8, magicDefense: 8, luck: 5}, 
            {}, 
            {strength: .17, defense: .11, magic: .28, magicDefense: .28, luck: .16}
        );


        this.updateAffinities({
            ice: 1.2, 
            fire: 1
        });

        this.updateResistances({
            ice: BaseResistances.absorb, 
            fire: .8
        });
    }
}
export class JackOLantern extends BaseCombatant{
    constructor(level){
        super(
            "Jack-o-Lantern", 
            level, 
            0, 
            {health: 30, strength: 5, defense: 5, magic: 8, magicDefense: 8, luck: 5}, 
            {}, 
            {strength: .13, defense: .11, magic: .30, magicDefense: .30, luck: .16}
        );


        this.updateAffinities({
            ice: .8, 
            fire: 1.2
        });

        this.updateResistances({
            ice: .8, 
            fire: BaseResistances.absorb
        });
    }
}
export class Impundulu extends BaseCombatant{
    constructor(level){
        super(
            "Impundulu", 
            level, 
            0, 
            {health: 40, strength: 3, defense: 4, magic: 9, magicDefense: 9, luck: 5}, 
            {}, 
            {strength: .10, defense: .16, magic: .28, magicDefense: .28, luck: .18}
        );


        this.updateAffinities({
            ice: .8, 
            fire: 1.2
        });

        this.updateResistances({
            ice: .8, 
            fire: BaseResistances.absorb
        });
    }
}