import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  pokemon: Pokemon[] = [];
  page = 1;
  totalPokemon = 648;
  subscription: Subscription;
  name = '';
  offset: number;
  limitItemOnPage = 18;

  constructor(private pokemonService: PokemonService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    this.offset = (this.page * this.limitItemOnPage) - this.limitItemOnPage;
    this.pokemonService.getPokemon(this.limitItemOnPage, this.offset)
      .subscribe((response: any) => {
        response.results.forEach(result => {
        this.http.get(result.url)
        .subscribe((uniqResponse: any) => {
          this.pokemon.push(uniqResponse);

          this.pokemon.sort((a, b) => a.id > b.id ? 1 : -1);
          });
      });
    });
    }
}

