import { PokemonType } from "./pokemon-type";

export class Pokemon {
  public name: string;
  public id: number;
  public types: PokemonType;
  public sprites: any;

  constructor(name: string, id: number, types: PokemonType, sprites: any) {
    this.name = name;
    this.id = id;
    this.types = types;
    this.sprites = sprites.front_default;
  }
}
