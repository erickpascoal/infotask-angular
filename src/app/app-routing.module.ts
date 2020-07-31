import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdemServicoListaComponent } from './pages/ordem-servico/ordem-servico-lista/ordem-servico-lista.component';
import { ClienteListaComponent } from './pages/cliente/cliente-lista/cliente-lista.component';
import { ServicoListaComponent } from './pages/servico/servico-lista/servico-lista.component';

const routes: Routes = [
  { path: "", component: OrdemServicoListaComponent },
  { path: "ordem-servico", component: OrdemServicoListaComponent },
  { path: "clientes", component: ClienteListaComponent },
  { path: "servico", component: ServicoListaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
