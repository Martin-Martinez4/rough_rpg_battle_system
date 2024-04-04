/* 
    attacks/skills will be an object
    {
        name: "fire",
        element: "fire",
        power: 10,
        mp: 5,
        accuracy: .95,
        type: physical or magic

    }
*/
export class Attack{
    name;
    element;
    power;
    mp;
    accuracy;
    type;

    static magic = "magic";
    static physical = "physical";

    constructor(name, element, power, mp, accuracy, type){
        this.name = name;
        this.element = element;
        this.power = power;
        this.mp = mp;
        this.accuracy = accuracy;
        this.type = type;
    }
}
