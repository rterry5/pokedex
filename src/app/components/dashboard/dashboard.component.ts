import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { PokemonType } from 'src/app/domain/pokemon-type';
import { element } from 'protractor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input()
  pokemon: Pokemon[] = [];

  @Input()
  keyword: string;

  @Output()
  emitter: EventEmitter<PokemonType> = new EventEmitter<PokemonType>();

  items = [];

  // pokemonType: PokemonType;
  numberOfTypes: number;
  totalPokemon = 648;
  name = '';
  offset: number;
  limitItemOnPage = 18;
  page = 1;
  showPokemon: boolean;

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

  showPokemonOfType(typeName) {
    console.log(typeName)
    this.showPokemon = true;
  }

  filter(){
    let pokemon = this.pokemon;
    let array = [];

    pokemon.forEach(pokemon => {
      pokemon.types.forEach((type: PokemonType) => {
        let pokemonType = type.type;
        array.push(pokemonType);
        array.forEach(element => {
          // console.log(element.name)
          if(this.keyword = pokemonType) {
            // console.log(element.name);
            this.showPokemonOfType(element.name);
          }
        });
      })
    })
  }
}
