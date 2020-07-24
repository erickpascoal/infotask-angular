import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdemServicoListaComponent } from './pages/ordem-servico/ordem-servico-lista/ordem-servico-lista.component';
import { ClienteListaComponent } from './pages/cliente/cliente-lista/cliente-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClienteFormComponent } from './pages/cliente/cliente-form/cliente-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    DateFormatPipe,
    OrdemServicoListaComponent,
    ClienteListaComponent,
    MenuBarComponent,
    ClienteFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
