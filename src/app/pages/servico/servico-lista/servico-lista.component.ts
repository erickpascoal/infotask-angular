import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicoFormComponent } from '../servico-form/servico-form.component';
import { ServicoService } from '../servico.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from './../../../websocket.service';

@Component({
  selector: 'app-servico-lista',
  templateUrl: './servico-lista.component.html',
  styleUrls: ['./servico-lista.component.scss']
})
export class ServicoListaComponent implements OnInit {
  servicos: any = [];
  totalServicos: number;

  public tableConfig = {
    columns: [
      { title: "Nome", property: "nome", width: 'auto', type: 'string' },
      { title: "Descrição", property: "descricao", width: 'auto', type: 'string' },
      { title: "Ativo", property: "ativo", width: 'auto', type: 'boolean', pipe: 'ativo' },
    ],
    rowActions: [
      { label: "Editar", action: "edit", icon: "fa fa-pencil" },
      { label: "Deletar", action: "delete", icon: "fa fa-trash" },
    ],
    rowsPerPage: 10,
    page: 1,
    countData: 0,
    createButton: true
  }

  private _socketSubscribe: Subscription;


  constructor(
    public dialog: MatDialog,
    public servicoService: ServicoService,
    private websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.loadServicos();
    this._socketSubscribe = this.websocketService.listen('servico').subscribe(response => this.atualizaLista(response));
  }

  ngOnDestroy(): void {
    this._socketSubscribe.unsubscribe();
  }

  async loadServicos() {
    const response: any = await this.servicoService.findAll(this.tableConfig);

    this.servicos = response.data;
    this.tableConfig.countData = +response.count;
    console.log(response)
  }

  public buildQuery(tableConfigToSend) {
    this.tableConfig = tableConfigToSend;
    this.loadServicos();
  }

  public handleRowActionTable(rowAction) {
    switch (rowAction.action) {
      case 'edit':
        this.openModalUpdate(rowAction.rowData);
        break;
      case 'delete':
        this.openModalDelete(rowAction.rowData);
      default:
        break;
    }
  }

  openModalCreate() {
    const dialogRef = this.dialog.open(ServicoFormComponent, {
      autoFocus: false,
      disableClose: true,
      width: '60%',
      maxHeight: '95%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openModalUpdate(servico) {
    const dialogRef = this.dialog.open(ServicoFormComponent, {
      data: {
        servico
      },
      disableClose: true,
      autoFocus: false,
      width: '60%',
      maxHeight: '95%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openModalDelete(servico) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Deletar',
        message: `Deseja realmente deletar [${servico.nome}] ?`,
        labelButtonCancel: 'Cancelar',
        labelButtonSubmit: 'Deletar'
      },
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.servicoService.delete(servico);
      }
    });
  }

  public atualizaLista(event) {
    if (event) {
      switch (event.action) {
        case 'create':
          this.servicos.unshift(event.servico)
          break;
        case 'update':
          const index = this.servicos.findIndex(m => m.id == event.servico.id);
          this.servicos[index] = event.servico;
          break;
        case 'delete':
          const indexDelete = this.servicos.findIndex(m => m.id == event.servico.id);
          this.servicos.splice(indexDelete, 1);
          break;
        default:
          break;
      }
    }
  }
}