import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input()
  pokemon: Pokemon[] = [];

  pokemonFiltered = [];

  keyword: string;

  totalPokemon: number;

  offset: number;

  limitItemOnPage = 18;

  page = 1;

  constructor(private pokemonService: PokemonService,
    private http: HttpClient) { }

  ngOnInit() {
    this.getPokemonPerPage();
    this.totalPokemon = 151;
    // this.getTotalNumberOfPokemon();
  }

  getPokemonPerPage() {
    this.offset = (this.page * this.limitItemOnPage) - this.limitItemOnPage;
    this.pokemonService.getPokemon(this.limitItemOnPage, this.offset)
      .subscribe((response: any) => {
        response.results.forEach((result: any) => {
          this.http.get(result.url)
            .subscribe((uniqResponse: any) => {
              this.pokemon.push(uniqResponse);
              this.pokemon.sort((a, b) => a.id > b.id ? 1 : -1);
            });
        });
      });
  }


  filterPokemonByType(pokeType: string) {
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
        name: result.name,
        sprites: result.sprites
      })).sort((a, b) => a.id > b.id ? 1 : -1);

      let nonFilteredPokemon = allPokemon.filter(mons => mons.type);
      let filteredPokemonsByType = allPokemon.filter(mon => mon.type.includes(pokeType));

      if (filteredPokemonsByType != nonFilteredPokemon) {
        this.pokemonFiltered = filteredPokemonsByType;
        this.pokemon = this.pokemonFiltered;
        console.log(this.pokemonFiltered);
      }
    });
  }

  // showAllPokemon() {
  //   this.getPokemonPerPage();
  // }
  // getTotalNumberOfPokemon(): any {
  //   this.pokemonService.getNumberOfPokemon()
  //     .subscribe((response: any) => {
  //       this.totalPokemon = response.count;
  //     });
  // }
}
