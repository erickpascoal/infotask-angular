import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WebsocketService } from './../../../websocket.service';

import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})

export class ClienteListaComponent implements OnInit, OnDestroy {

  clientes: any = [];
  totalClientes: number;
  openModalForm = false;
	clienteSelected;

  public tableConfig = {
    columns: [
      { title: "Cliente", property: "nome", width: 'auto', type: 'string' },
      { title: "Contato", property: "celular", width: 'auto', type: 'string' },
      { title: "Cidade", property: "cidade", width: 'auto', type: 'string' }
    ],
    rowActions: [
      { label: "Editar", action: "edit", icon: "fa fa-pencil" },
      { label: "Deletar", action: "delete", icon: "fa fa-trash" }
    ],
    rowsPerPage: 5,
    page: 1,
		countData: 0
  }

  private _socketSubscribe: Subscription;

  constructor(private clienteService: ClienteService, private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.loadClientes();
    this._socketSubscribe = this.websocketService.listen('cliente').subscribe(response => this.atualizarListaClientes(response));
  }

  ngOnDestroy(): void {
    this._socketSubscribe.unsubscribe();
  }

  async loadClientes() {
    const response: any = await this.clienteService.findAll(this.tableConfig);

    this.clientes = response.data;
    this.tableConfig.countData = +response.count;
  }

  public buildQuery(tableConfigToSend) {
    this.tableConfig = tableConfigToSend;

    this.loadClientes();
  }

  public handleAction(rowAction) {
    switch(rowAction.action) {
      case 'edit':
        this.openEditarCadastro(rowAction.rowData);
        break;
      case 'delete':
        this.clienteService.delete(rowAction.rowData);
      default: break;
    }
  }

  public atualizarListaClientes(event) {
    if(event) {
      switch(event.action) {
        case 'create':
          this.clientes.unshift(event.cliente);
          break;
        case 'update':
          const index = this.clientes.findIndex(c => c.id === event.cliente.id);
          this.clientes[index] = event.cliente;
          break;
        case 'delete':
          const indexToDel = this.clientes.findIndex(c => c.id === event.cliente.id);
          this.clientes.splice(indexToDel, 1);
        default: break;
      }
    }
  }

  openCadastroCliente() {
    this.clienteSelected = null;
    this.openModalForm = true;
  }

  closeClienteForm() {
    this.openModalForm = false;
  }

  openEditarCadastro(cliente) {
    this.clienteSelected = cliente;
    this.openModalForm = true;
  }

  openModalDeletarCliente(cliente) {
    this.clienteSelected = cliente;
  }
}
