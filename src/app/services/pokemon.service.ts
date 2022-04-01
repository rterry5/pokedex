import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokemonType } from 'src/app/domain/pokemon-type';
import { PokemonEnumTypes } from 'src/app/enum/pokemon-enum-types';
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

  getMoreData(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }

  getPokemonType(type: any) {
    return this.http.get(`https://pokeapi.co/api/v2/type/${type}`)
  }

  getTypes(): PokemonType[] {
    return Types;
  }
}