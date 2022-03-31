import { PokemonType } from "./pokemon-type";

export class Pokemon {
  public name: string;
  public id: number;
  public types: PokemonType[];
  public sprites: string;

  constructor(name: string, id: number, types: [], sprites: string) {
    this.name = name;
    this.id = id;
    this.types = types;
    this.sprites = sprites;
  }
}
