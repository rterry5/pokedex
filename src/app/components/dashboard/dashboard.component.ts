import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
  // pokeType: string;

  numberOfTypes: number;
  totalPokemon: number;
  name = '';
  offset: number;
  limitItemOnPage = 18;
  page = 1;
  pokemonId: number;

  showPokemon: boolean;

  constructor(private pokemonService: PokemonService,
    private http: HttpClient) { }

  ngOnInit() {
    this.getPokemonPerPage();
    this.getTotalNumberOfPokemon();
    this.showPokemon = true;
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

  getTotalNumberOfPokemon(): any {
    this.pokemonService.getNumberOfPokemon()
      .subscribe((response: any) => {
        this.totalPokemon = response.count;
      });
  }

  showPokemonOfType(type: string) {
    this.keyword = type;
    this.showPokemon = true;
  }


  filter(pokeType: string) {
    this.keyword = pokeType;
    const promises = [];
      for (let i = 1; i <= this.totalPokemon; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
      }
      Promise.all(promises).then((pokemon) => {
        const allPokemon = pokemon.map((result) => ({
          type: result.types.map((type) => type.type.name).join(', '),
          id: result.id,
          name: result.name
        })).sort((a, b) => a.id > b.id ? 1 : -1);

        const filteredPokemonsByType = allPokemon.filter(mon => mon.type.includes(pokeType));
        console.log(pokeType, filteredPokemonsByType);

        this.showPokemonOfType(this.keyword);
      });
  }
}
