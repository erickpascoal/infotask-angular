import { DialogComponent } from './../../../shared/dialog/dialog.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from './../../../websocket.service';
import { ClienteService } from '../cliente.service';
import { MatDialog } from '@angular/material/dialog';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { TableConfig } from 'src/app/shared/lista/table-config';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})

export class ClienteListaComponent implements OnInit, OnDestroy {
  clientes: any = [];
  totalClientes: number;

  public tableConfig: TableConfig = {
    columns: [
      { title: "Nome", property: "nome", width: 'auto', type: 'string' },
      { title: "CPF", property: "cpf", width: 'auto', type: 'string' },
      { title: "Contato", property: "telefone_principal", width: 'auto', type: 'string' },
      { title: "Cidade", property: "cidade", width: 'auto', type: 'string' },
      { title: "Ativo", property: "ativo", width: 'auto', type: 'boolean', pipe: 'ativo' },
    ],
    rowActions: [
      { label: "Editar", action: "edit", icon: "fa fa-pencil" },
      { label: "Deletar", action: "delete", icon: "fa fa-trash" },
    ],
    topActions: [
      { label: "Cadastrar", action: "create", icon: "fa fa-plus", position: 'left' },
    ],
    rowsPerPage: 10,
    page: 1,
    countData: 0,
    name: "Clientes"
  }

  private _socketSubscribe: Subscription;

  constructor(
    private clienteService: ClienteService,
    private websocketService: WebsocketService,
    public dialog: MatDialog
  ) { }

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

  public onButtonActionEmmiter(rowAction) {
    switch (rowAction.action) {
      case 'edit':
        this.openModalUpdate(rowAction.rowData);
        break;
      case 'delete':
        this.openModalDelete(rowAction.rowData);
        break;
      case 'create':
        this.openModalCreate();
        break;
      default: break;
    }
  }

  public atualizarListaClientes(event) {
    if (event) {
      switch (event.action) {
        case 'create':
          this.clientes.unshift(event.cliente);
          break;
        case 'update':
          const index = this.clientes.findIndex(c => c.id == event.cliente.id);
          this.clientes[index] = event.cliente;
          break;
        case 'delete':
          console.log(event.cliente);
          const indexDelete = this.clientes.findIndex(c => c.id == event.cliente.id);
          this.clientes.splice(indexDelete, 1);
        default: break;
      }
    }
  }

  openModalCreate() {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      autoFocus: false,
      disableClose: true,
      width: '80%',
      maxHeight: '95%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openModalUpdate(cliente) {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      data: {
        cliente
      },
      disableClose: true,
      autoFocus: false,
      width: '80%',
      maxHeight: '95%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openModalDelete(cliente) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Deletar',
        message: `Deseja realmente deletar [${cliente.nome}] ? `,
        labelButtonCancel: 'Cancelar',
        labelButtonSubmit: 'Deletar'
      },
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.clienteService.delete(cliente);
      }
    });
  }
}
