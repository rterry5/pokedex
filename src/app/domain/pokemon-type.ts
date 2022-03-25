import { PokemonEnumTypes } from "../enum/pokemon-enum-types";

export class PokemonType {
    public type: string;
    public id: number;

    constructor(type: string, id: number) {
        this.type = type;
        this.id = id;
    }
}
