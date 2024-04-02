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
    The game will be small so inheritance is fine
*/
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

    constructor(name, level, xp, baseStats, affinities, resistances, skills){
        this.name = name;
        this.level - level;
        this.xp = xp;
        this.baseStats = baseStats;
        this.affinities = affinities;
        this.resistances = resistances;
        
        // run method to set base actions and assign skills
        this.assignActions(skills);

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

    assignActions(skills){
        this.actions = {
            attack: "attack",
            skills: "skills",
            defend: "defend",
            items: "items",
            skills: skills,
        }
    }

}





