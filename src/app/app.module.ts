import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { HeaderComponent } from './components/header/header.component';
import { PokemonTypesComponent } from './components/pokemon-types/pokemon-types.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PokemonCardComponent,
    HeaderComponent,
    PokemonTypesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
