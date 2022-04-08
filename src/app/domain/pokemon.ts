import { PokemonType } from "./pokemon-type";

export class Pokemon {
  public name: string;
  public id: number;
  public types: PokemonType;
  public type: string;
  public sprites: any;

  constructor(name: string, id: number, types: PokemonType, type: string, sprites: any) {
    this.name = name;
    this.id = id;
    this.types = types;
    this.type = type;
    this.sprites = sprites.front_default;
  }
}
