import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokemonType } from 'src/app/domain/pokemon-type';
import { Types } from '../components/data/types';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  offset: number;
  limitItemOnPage = 18;
  page = 1;
  pokemon: Pokemon[] = [];

  constructor(
    private http: HttpClient
  ) { }

  // Get Pokemon
  getPokemon(limit: number, offset: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  }

  getPokemonById(id: number) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getMoreData(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getPokemonType(type: any) {
    return this.http.get(`https://pokeapi.co/api/v2/type/${type}`)
  }

  getNumberOfPokemon() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/?limit=0`);
  }

  getTypes(): PokemonType[] {
    return Types;
  }
}
