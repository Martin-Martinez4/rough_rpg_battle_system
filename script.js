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
class BaseResistances{
    fire = 1;
    ice = 1;
    force = 1;
    lighting = 1;
    dark = 1;
    physical = 1;

    static nullify = 0;
    static absorb =  -1;
    static reflect = -2;
}

class BaseGrowthRate{
    strength= 20;
    defense= 20;
    magic= 20;
    magicDefense= 20;
    luck=20;
}

class Attack{
    name;
    type;
    power;
    mp;
    accuracy;

    constructor(name, type, power, mp, accuracy){
        this.name = name;
        this.type = type;
        this.power = power;
        this.mp = mp;
        this.accuracy = accuracy;
    }
}

class BaseCombatant{
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
    
    // baseHealth;
    // baseAttack;
    // baseDefense;
    // baseMagic
    // baseMagicDefense
    baseStats;

    constructor(name, level, xp, baseStats, skills, growthRate=null){
        this.name = name;
        this.level =  level;
        this.xp = xp;
        this.baseStats = baseStats;
        this.affinities = new BaseAffinities;
        this.resistances = new BaseResistances;
        this.growthRate = growthRate || new BaseGrowthRate();
        
        // run method to set base actions and assign skills
        this.buildActions(skills);

        // run method to calculate stats
        this.calculateStats();
    }

    calculateStats(){
        // Find a better way to do this
        // Later implement growth factors/chances for stat growth
        const {strength, defense, magic, magicDefense} = this.growthRate;
        
        this.health = this.baseStats.health + (this.level * 8);
        this.strength = Math.round(this.baseStats.strength + (this.level  * strength*.1));
        this.defense = Math.round(this.baseStats.defense + (this.level * defense*.1));
        this.magic = Math.round(this.baseStats.magic + (this.level * magic*.1));
        this.magicDefense = Math.round(this.baseStats.magicDefense + (this.level * magicDefense*.1));
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

        const {power, type} = skillStats;

        const targetResistance = target.resistances[type];

        if(targetResistance == BaseResistances.absorb){
            // handle enemy absorbs damage as health
            return;
        }
        else if(targetResistance == BaseResistances.nullify){
            // handle enemy takes 0 damage
            return;
        }
        else if(targetResistance == BaseResistances.reflect){
            // handle damage is dealt back to player as a neutral type attack of .8 * attack power
            return;
        }

        // level + strength * power 
        const damageAmount = Math.floor((this.level * 3 + this.strength * 2 + power * this.affinities[type])/(targetResistance + target.defense * .20));

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

    showStats(){
       console.log( {
            name: this.name,
            level: this.level,
            health: this.health,
            strength: this.strength,
            defense: this.strength,
            magic: this.magic,
            magicDefense: this.magicDefense
        })
    }

}


class JackFrost extends BaseCombatant{
    name = "Jack Frost";
    affinities= new BaseAffinities();
    resistances = new BaseResistances();
    baseStats = {}
    constructor(level){
        super(
            name, 
            level, 
            0, 
            {health: 30, strength: 5, defense: 5, magic: 8, magicDefense: 8}, 
            {}, 
            {strength: 17, defense: 17, magic: 25, magicDefense: 25, luck: 16}
        );

        this.updateAffinities({
            ice: 1.2, 
            fire: .8
        });

        this.updateResistances({
            ice: BaseResistances.absorb, 
            fire: .8
        });
    }
}


const jackieFrost = new JackFrost(2);
jackieFrost.showStats();

const jackieFrost2 = new JackFrost(200);
jackieFrost2.showStats();






