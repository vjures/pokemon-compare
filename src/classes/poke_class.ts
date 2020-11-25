export interface PokeInterface{
    num: number;
    pokemon: string;
    type1: string;
    type2: string;
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    special: number;
    gif: string;
    png: string;
    desc: string;
}

export class PokeClass implements PokeInterface{
    num = 0;
    pokemon = '';
    type1 = '';
    type2 = '';
    hp = 0;
    attack = 0;
    defense = 0;
    speed = 0;
    special = 0;
    gif = '';
    png = '';
    desc = '';
}
