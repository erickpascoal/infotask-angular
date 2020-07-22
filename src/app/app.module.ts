import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdemServicoListaComponent } from './pages/ordem-servico/ordem-servico-lista/ordem-servico-lista.component';
import { ClienteListaComponent } from './pages/cliente/cliente-lista/cliente-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    OrdemServicoListaComponent,
    ClienteListaComponent,
    MenuBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
