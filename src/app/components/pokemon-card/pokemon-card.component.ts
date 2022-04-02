import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonType } from 'src/app/domain/pokemon-type';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input()
  pokemonCard: Pokemon[];

  @Input()
  showPokemon: boolean;

  constructor(private pokemonService: PokemonService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

}

