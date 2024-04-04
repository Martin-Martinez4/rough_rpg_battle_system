export class BaseAffinities{
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
export class BaseResistances{
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

export class BaseGrowthRate{
    strength= 20;
    defense= 20;
    magic= 20;
    magicDefense= 20;
    luck=20;
}
