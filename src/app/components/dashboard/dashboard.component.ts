import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { PokemonType } from 'src/app/domain/pokemon-type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input()
  pokemon: Pokemon[] = [];

  pokemonType: PokemonType;
  numberOfTypes: number;
  totalPokemon = 648;
  name = '';
  offset: number;
  limitItemOnPage = 18;
  page = 1;

  constructor(private pokemonService: PokemonService,
    private http: HttpClient) { }

  ngOnInit() {
    this.getPokemonPerPage();
  }

  getPokemonPerPage() {
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

  // getPokemonTypes() {
  //   this.pokemonService.getPokemonType(this.pokemonType.id)
  //     .subscribe((data: any) => {
  //       this.pokemonType = data.id;
  //       console.log(this.pokemonType);
  //     })
  // }

  // getNumberOfTypes() {
  //   this.http.get(`https://pokeapi.co/api/v2/type`)
  //     .subscribe((data: any) => {
  //       this.numberOfTypes = data.count;
  //       console.log(this.numberOfTypes);
  //     })
  // }
}
