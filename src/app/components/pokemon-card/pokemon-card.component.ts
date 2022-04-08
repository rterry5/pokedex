import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input()
  pokemonCard: Pokemon;

  @Input()
  pokemonFiltered: Pokemon;

  constructor() { }

  ngOnInit(): void {
  }

}

