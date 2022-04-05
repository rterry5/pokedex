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

  @Input()
  keyword: string;

  pokemonFiltered = [];

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

  showPokemonOfType(showPokemon: boolean) {
    this.showPokemon = showPokemon;
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

        let allMonTypes = '';
        let nonFilteredPokemon = allPokemon.filter(mons => mons.type.includes(allMonTypes));
        let filteredPokemonsByType = allPokemon.filter(mon => mon.type.includes(pokeType));

        this.pokemonFiltered = filteredPokemonsByType;
        if (filteredPokemonsByType != nonFilteredPokemon) {
          this.showPokemonOfType(true);
          console.log(this.pokemonFiltered)
          // this.pokemon = this.pokemonFiltered;
          // this.totalPokemon = this.pokemonFiltered.length;

        }
      });
  }
}






        // let name = '';
        // nonFilteredPokemon.forEach(mons => {
        //   mons.name = allMonTypes;
        //   filteredPokemonsByType.forEach(filteredMons => {
        //     filteredMons.name = pokeType;
        //   })
        //   if (pokeType == mons.name) {
        //     console.log(pokeType, mons.name, 'matches');
        //     this.showPokemonOfType(true);
        //     return pokeType;
        //   }
        // });
