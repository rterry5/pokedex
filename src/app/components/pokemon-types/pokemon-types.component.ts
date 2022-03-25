import { Component, Input, OnInit } from '@angular/core';
import { PokemonType } from 'src/app/domain/pokemon-type';
import { PokemonEnumTypes } from 'src/app/enum/pokemon-enum-types';
import { Types } from '../data/types';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-types',
  templateUrl: './pokemon-types.component.html',
  styleUrls: ['./pokemon-types.component.scss']
})
export class PokemonTypesComponent implements OnInit {

  pokemonType = Types;
  typeName: string;
  typeId: number;


  constructor(private pokemonService: PokemonService,
    private http: HttpClient) { }


  ngOnInit() {
    this.getPokemonType();
    this.filterPokemonType();
    this.pokemonType;
  }

  getPokemonType() {
    this.pokemonService.getTypes()
      .forEach((data: any) => {
        this.typeName = data.type;
        this.typeId = data.id;
        console.log(this.typeName);
      })
  }

  filterPokemonType() {
    this.pokemonType.forEach((data: any) => {
      console.log(data)
    })
  }
}
