import { WebsocketService } from './../../../websocket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TipoServicoService } from '../tipo-servico.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TipoServicoFormComponent } from '../tipo-servico-form/tipo-servico-form.component';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { TableConfig } from 'src/app/shared/lista/table-config';

@Component({
  selector: 'app-tipo-servico-list',
  templateUrl: './tipo-servico-list.component.html',
  styleUrls: ['./tipo-servico-list.component.scss']
})
export class TipoServicoListComponent implements OnInit {
  tiposDeServico: any = [];
  totalServicos: number;

  public tableConfig: TableConfig = {
    columns: [
      { title: "Nome", property: "nome", width: 'auto', type: 'string' },
      { title: "Descrição", property: "descricao", width: 'auto', type: 'string' },
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
    name: "Tipos de Serviço"
  }

  private _socketSubscribe: Subscription;

  constructor(
    public dialog: MatDialog,
    public tipoServicoService: TipoServicoService,
    private websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this.loadTiposServico();
    this._socketSubscribe = this.websocketService.listen('tipoServico').subscribe(response => this.atualizaLista(response));
  }

  ngOnDestroy(): void {
    this._socketSubscribe.unsubscribe();
  }

  async loadTiposServico() {
    const response: any = await this.tipoServicoService.findAll(this.tableConfig);
    this.tiposDeServico = response.data;
    this.tableConfig.countData = +response.count;
  }

  public buildQuery(tableConfigToSend) {
    this.tableConfig = tableConfigToSend;
    this.loadTiposServico();
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

  openModalCreate() {
    const dialogRef = this.dialog.open(TipoServicoFormComponent, {
      autoFocus: false,
      disableClose: true,
      width: '60%',
      maxHeight: '95%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openModalUpdate(tipoServico) {
    const dialogRef = this.dialog.open(TipoServicoFormComponent, {
      data: {
        tipoServico
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

  openModalDelete(tipoServico) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Deletar',
        message: `Deseja realmente deletar [${tipoServico.nome}] ?`,
        labelButtonCancel: 'Cancelar',
        labelButtonSubmit: 'Deletar'
      },
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.tipoServicoService.delete(tipoServico);
      }
    });
  }

  public atualizaLista(event) {
    if (event) {
      switch (event.action) {
        case 'create':
          this.tiposDeServico.unshift(event.tipoServico)
          break;
        case 'update':
          const index = this.tiposDeServico.findIndex(m => m.id == event.tipoServico.id);
          this.tiposDeServico[index] = event.tipoServico;
          break;
        case 'delete':
          const indexDelete = this.tiposDeServico.findIndex(m => m.id == event.tipoServico.id);
          this.tiposDeServico.splice(indexDelete, 1);
          break;
        default:
          break;
      }

      console.log()
    }
  }
}
