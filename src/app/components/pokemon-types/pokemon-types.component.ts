import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Types } from '../data/types';

@Component({
  selector: 'app-pokemon-types',
  templateUrl: './pokemon-types.component.html',
  styleUrls: ['./pokemon-types.component.scss']
})
export class PokemonTypesComponent implements OnInit {

  @Output()
  pokemonTypeClicked: EventEmitter<string> = new EventEmitter<string>();

  pokemonTypes = Types;

  keyword: string;

  constructor() { }

  ngOnInit() {
    this.pokemonTypes;
  }

  getTypeClicked(keyword: string) {
    this.pokemonTypeClicked.emit(keyword);
    this.keyword = keyword;
    console.log(keyword)
  }
}
