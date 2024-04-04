import { BaseAffinities, BaseGrowthRate, BaseResistances } from "./BaseStats.js";
import { Attack } from "./Attacks.js";

// Need to implement the battle logic next

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

    random 3 stats grow 
    but stats are weighted to favor certain stats
    Can be as simple as from this range to this range this stat increases and give more weight by giving more numbers
    Or can start with the base stat growth being a random number 1 to 5
        To weight towards defense add .5 to the range
    Math.floor(Math.rand()*100) + 1 random from 1 to 100 is easier
    1 strength
    2 defense
    3 magic
    4 magicdef
    5 luck

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
    HP = VIT * 4.7 + LVL * 7.4
    PATK = STR * 2.1 + LVL * 5.6 + 50
    MATK = MAG * 2.1 + LVL * 5.6 + 50
    PDEF = VIT * 1.1 + STR * 0.5 + LVL * 5.6 + 50
    MDEF = VIT * 1.1 + MAG * 0.5 + LVL * 5.6 + 50

    HEALING FORMULA = (MATK * (HEAL POWER * (1 + % HEALING MODIFIERS FROM SKILL LEVELS) / 100) * HEALING_CONST + MIN_HEAL_VAL) * RANDOM_HEA_VAR * (1 + % HEAL MODIFIERS)

    LUCK DIFF = USER LUCK - ENEMY LUCK
    CRIT LUK VALUE = 20 if LUCK DIFF >= 30, 
                    15 if LUCK DIFF >= 20, 
                    10 if LUCK DIFF >= 10,
                    0 if LUCK DIFF >= 0,
                    -10 if LUCK DIFF < 0
    CRIT CHANCE = CRIT LUK VALUE + BASE SKILL CRIT CHANCE + PASSIVE SKILLS/PANEL CRIT CHANCE + CRIT BRANDS - ENEMY CRIT REDUC SKILLS/PANEL + Dx2 CRIT SKILL

    HP type: 5 HP for every 1 MP
    Balanced type: 2 HP for every 1 MP
    MP type: 1 HP for every 1 MP

*/
export class BaseCombatant{
    name;
    level;
    xp;
    health;
    strength;
    defense;
    magic;
    magicDefense;
    affinities;
    resistances;
    skills;
    actions;
    baseStats;

    constructor(name, level, xp, baseStats, skills, growthRate=null){
        this.name = name;
        this.level =  level;
        this.xp = xp;
        this.baseStats = baseStats;
        this.affinities = new BaseAffinities();
        this.resistances = new BaseResistances();
        this.growthRate = growthRate || new BaseGrowthRate();
        
        // run method to set base actions and assign skills
        this.buildActions(skills);

        // run method to calculate stats
        this.calculateStats();
    }

    calculateStats(){
        // Find a better way to do this
        // Later implement growth factors/chances for stat growth
        const {strength, defense, magic, magicDefense, luck} = this.growthRate;

        this.health = this.baseStats.health + (this.level * 7);
        this.strength = Math.round(this.baseStats.strength + (this.level  * strength));
        this.defense = Math.round(this.baseStats.defense + (this.level * defense));
        this.magic = Math.round(this.baseStats.magic + (this.level * magic));
        this.magicDefense = Math.round(this.baseStats.magicDefense + (this.level * magicDefense));
        this.luck = Math.round(this.baseStats.luck + (this.level * luck));
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

    updateAffinities(updatedAffinities){
        for(const affinity in updatedAffinities){
            this.affinities[affinity] = updatedAffinities[affinity];
        }
    }

    updateResistances(updatedResistances){
        for(const resistance in updatedResistances){
            this.resistances[resistance] = updatedResistances[resistance];
        }
    }

    attackTarget(skillStats, target){
        if(!this.willAttackHit()){
            // indicate the attack missed
            return;
        }

        const {power, element, type} = skillStats;

        const targetResistance = target.resistances[element];

        if(targetResistance == BaseResistances.absorb){
            // handle enemy absorbs damage as health
            return;
        }
        else if(targetResistance == BaseResistances.nullify){
            // handle enemy takes 0 damage
            return;
        }
        else if(targetResistance == BaseResistances.reflect){
            // handle damage is dealt back to player as a neutral element attack of .8 * attack power
            return;
        }

        let damageAmount;

        // Math.floor((Math.pow(this.level,  .85 + (this.level/(target.level+this.level))) is used to closer correlate attack output to level difference 
        if(type == Attack.physical){

            damageAmount = Math.floor((Math.pow(this.level, .95 + (this.level/(target.level+this.level))) * 1.25 + this.strength * (power) * this.affinities[element]) / (targetResistance + target.defense * .25));
        }
        else if(type == Attack.magic){
            damageAmount = Math.floor((Math.pow(this.level, .95 + (this.level/(target.level+this.level))) * 1.25 + this.magic * (power) * this.affinities[element]) / (targetResistance + target.magicDefense * .25));

        }
        console.log(damageAmount)
    }

    willAttackHit(){
        // this will be fleshed out later
        return true;
    }

    willAttackCrit(){
        // this will be fleshed out later
        return false;
    }

    levelUp(){
        // Health and MP always increase
        // There are three stat increase chances
            // stats have an antagonistic relationship to each other, if one stat increases it disallows the other from increasing
        // To be implemented later, one user choice point in addition to the three
        /* 
            Can be choosen as a player trait or something
            HP type: 5 HP for every 1 MP
            Balanced type: 2 HP for every 1 MP
            MP type: 1 HP for every 1 MP
        */
       /* 
            Main player can always get 7 hp and 2 mp
       */
        let numberOfStatIncreases = 3;

        while(numberOfStatIncreases > 0){
            let roll = Math.random();
            numberOfStatIncreases--;

            // ugly code need to make a loop at the very least
            let lastRange = 0;
            if(roll > 0 && roll <= this.growthRate.strength){
                this.strength += 1;
                continue;
            }

            lastRange += this.growthRate.strength;
            if(roll <= this.growthRate.defense + lastRange){
                this.defense += 1;
                continue;
            }

            lastRange += this.growthRate.defense;
            if(roll <= this.growthRate.magic + lastRange){
                this.magic += 1;
                continue;
            }

            lastRange += this.growthRate.magic;
            if(roll <= this.growthRate.magicDefense  + lastRange){
                this.magicDefense += 1;
                continue;
            }

            lastRange += this.growthRate.magicDefense;

            console.log(this.growthRate.luck + lastRange)
            if(roll <= this.growthRate.luck + lastRange){
                this.luck += 1;
                continue;
            }
        }

        this.health += 10;
        this.level++;


    }

    showStats(){
       console.log( {
            name: this.name,
            level: this.level,
            health: this.health,
            strength: this.strength,
            defense: this.strength,
            magic: this.magic,
            magicDefense: this.magicDefense,
            luck: this.luck,
        })
    }

}

