import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';
import { Types } from '../data/types';
import { HttpClient } from '@angular/common/http';
import { PokemonService } from 'src/app/services/pokemon.service';
import { PokemonType } from 'src/app/domain/pokemon-type';

@Component({
  selector: 'app-pokemon-types',
  templateUrl: './pokemon-types.component.html',
  styleUrls: ['./pokemon-types.component.scss']
})
export class PokemonTypesComponent implements OnInit {

  @Input()
  pokemonType: Pokemon[];

  @Output()
  pokemonTypeClicked: EventEmitter<string> = new EventEmitter<string>();

  pokemonTypes = Types;

  constructor() { }

  ngOnInit() {
    this.pokemonTypes;
  }

  getTypeClicked(keyword) {
    this.pokemonTypeClicked.emit(keyword);
  }
}