import { WebsocketService } from './../../../websocket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServicoService } from '../ordem-servico.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OrdemServicoFormComponent } from '../ordem-servico-form/ordem-servico-form.component';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-ordem-servico-lista',
  templateUrl: './ordem-servico-lista.component.html',
  styleUrls: ['./ordem-servico-lista.component.scss']
})
export class OrdemServicoListaComponent implements OnInit, OnDestroy {

  ordemServicos: any = [];
  totalOrdemServicos: number;

  public tableConfig = {
    columns: [
      { title: "Número", property: "numero", width: '50%', type: 'string' },
      { title: "Status", property: "status", width: 'auto', type: 'string' },
      { title: "Cliente", property: "cliente_nome", width: 'auto', type: 'string' },
      { title: "Data Entrada", property: "data_entrada", width: '1%', type: 'date', pipe: "date: DD/MM/YYYY HH:mm" },
      { title: "Data Saída", property: "data_saida", width: '1%', type: 'date', pipe: "date: DD/MM/YYYY HH:mm" },
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

  public value = true;

  private _socketSubscribe: Subscription;

  constructor(
    private ordemServicoService: OrdemServicoService,
    private websocketService: WebsocketService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.loadOrdemServicos();
    this._socketSubscribe = this.websocketService.listen('ordemServico').subscribe(response => this.atualizaLista(response));
  }

  ngOnDestroy(): void {
    this._socketSubscribe.unsubscribe();
  }

  async loadOrdemServicos() {
    const response: any = await this.ordemServicoService.findAll(this.tableConfig);
    this.ordemServicos = response.data;
    this.tableConfig.countData = +response.count;
  }

  public buildQuery(tableConfigToSend) {
    this.tableConfig = tableConfigToSend;
    this.loadOrdemServicos();
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

  public atualizaLista(event) {
    if (event) {
      switch (event.action) {
        case 'create':
          this.ordemServicos.unshift(event.ordemServico)
          break;
        case 'update':
          const index = this.ordemServicos.findIndex(m => m.id == event.ordemServico.id);
          this.ordemServicos[index] = event.ordemServico;
          break;
        case 'delete':
          const indexDelete = this.ordemServicos.findIndex(m => m.id == event.ordemServico.id);
          this.ordemServicos.splice(indexDelete, 1);
          break;
        default:
          break;
      }
    }
  }

  openModalCreate() {
    const dialogRef = this.dialog.open(OrdemServicoFormComponent, {
      autoFocus: false,
      disableClose: true,
      width: '80%',
      maxHeight: '95%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openModalUpdate(ordemServico) {
    const dialogRef = this.dialog.open(OrdemServicoFormComponent, {
      data: {
        ordemServico
      },
      disableClose: true,
      autoFocus: false,
      width: '80%',
      maxHeight: '95%',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openModalDelete(ordemServico) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Deletar',
        message: `Deseja realmente deletar [${ordemServico.numero}] ? `,
        labelButtonCancel: 'Cancelar',
        labelButtonSubmit: 'Deletar'
      },
      disableClose: true,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.ordemServicoService.delete(ordemServico);
      }
    });
  }
}
