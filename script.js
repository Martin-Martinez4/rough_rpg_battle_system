// Enemy and player class have a lot in common
// Idea integrate it into the maze
// Black out the maze and reveal a 5 block radius.  
/* 
    name: string
    health: number
    level: number
    xp: number
    affinities: object
    resistances: object
    actions: object

*/

/* 
    // makes attacks weaker or stronger
    affinities: {
        elementName: multiplier
    }

    // determines elements that give advantage turns and take them away
    // affinities will get applied to the attacking team
    // null eats the attack
    // reflect damage does .25 or .50 times neutral attack back at the one who did it.  
     affinities: {
        elementName: multiplier or 1 for advantage 0 neutral and -1 disadvantage -2 for reflect or null
    }

    // actions
    // There will be some standard actions
    // Skills action will be an object or array of skills

*/

/* 
    bestiary will hold the enemies, if it is a file or class is to be determined.  
*/

/* 
    attacks/skills will be an object
    {
        name: "fire",
        type: "fire",
        power: 10,
        mp: 5,
        accuracy: .95,

    }

    player chooses an attack and target

    attack check if hit or miss
    use player accracy, move accuracy, enemy evasion

    check if the attack will be a critical attack
    question how should it stack with resistances? (calcualtedPower/resistances) * critModifier

    apply player applicable affinities
    apply player magic attack/ attack 

    apply enemy resistances
    apply enemy magic defense/ defense
*/

/* 
    The game will be small so inheritance is fine
*/
class BaseAffinities{
    fire = 1;
    ice = 1;
    force = 1;
    lighting = 1;
    dark = 1;
    physical = 1;
}
// 0 nullify
// -1 will absorb
// -2 reflect
// .5 will do double damage
// ultimately it will check for 0 or -2, else do a divide to calculate damage
// should put nullify and reflect in an enum
const specialResistances = {
    null: 0,
    absorb: -1,
    reflect: -2,
} 

// add special cases to these classes
class BaseResistances{
    fire = 1;
    ice = 1;
    force = 1;
    lighting = 1;
    dark = 1;
    physical = 1;
}

class BaseCombatant{
    name;
    level;
    xp;
    health;
    attack;
    defense;
    magic;
    magicDefense;
    affinities;
    resistances;
    skills;
    actions;
    
    // baseHealth;
    // baseAttack;
    // baseDefense;
    // baseMagic
    // baseMagicDefense
    baseStats;

    constructor(name, level, xp, baseStats, skills){
        this.name = name;
        this.level - level;
        this.xp = xp;
        this.baseStats = baseStats;
        this.affinities = new BaseAffinities;
        this.resistances = new BaseResistances;
        
        // run method to set base actions and assign skills
        this.buildActions(skills);

        // run method to calculate stats
        this.calculateStats();
    }

    calculateStats(){
        // Find a better way to do this
        // Later implement growth factors/chances for stat growth
        this.health = this.baseStats.health + (this.level * 8);
        this.attack = this.baseStats.attack + (this.level * 4);
        this.defense = this.baseStats.defense + (this.level * 2);
        this.magic = this.baseStats.magic + (this.level * 4);
        this.magicDefense = this.baseStats.magicDefense + (this.level * 2);
    }

    buildActions(skills){
        this.actions = {
            attack: "attack",
            skills: "skills",
            defend: "defend",
            items: "items",
            skills: skills,
        }
    }

    updateAffinities(updateMap){
        for(const affinity in updateMap){
            this.affinities[affinity] = updateMap[affinity];
        }
    }

    updateResistances(updateMap){
        for(const resistance in updateMap){
            this.resistances[resistance] = updateMap[resistance];
        }
    }

}


class JackFrost extends BaseCombatant{
    name = "Jack Frost";
    affinities= new BaseAffinities();
    resistances = new BaseResistances();
    baseStats = {}
    constructor(level, xp){
        super(name, level, xp, {}, {});
        this.updateAffinities({ice: 1.2, fire: .8})
        this.updateResistances({ice: specialResistances.absorb, fire: .8})
    }
}

const jackieFrost = new JackFrost;
console.log(jackieFrost.affinities);
console.log(jackieFrost.resistances)





