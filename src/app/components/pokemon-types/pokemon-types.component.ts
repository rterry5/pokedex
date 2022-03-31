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
  pokemonSorted: Pokemon[];

  @Output()
  emitter: EventEmitter<PokemonType> = new EventEmitter<PokemonType>();

  items = [];
  pokemonType = Types;
  typeName: string;
  typeId: number;

  constructor(private pokemonService: PokemonService,
    private http: HttpClient) { }


  ngOnInit() {
    this.pokemonType;
  }

  getTypeClicked(keyword) {
    this.emitter.emit(keyword);
    // console.log(keyword);
  }
}
