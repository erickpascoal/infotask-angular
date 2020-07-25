import { WebsocketService } from './../../../websocket.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdemServicoService } from '../ordem-servico.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ordem-servico-lista',
  templateUrl: './ordem-servico-lista.component.html',
  styleUrls: ['./ordem-servico-lista.component.scss']
})
export class OrdemServicoListaComponent implements OnInit, OnDestroy {

  ordemServicos: any = [];
  totalOrdemServicos: number;
  openModalForm = false;
  ordemServicoSelected;

  public tableConfig = {
    columns: [
      { title: "Número", property: "numero", width: 'auto', type: 'string' },
      { title: "Status", property: "status", width: 'auto', type: 'string' },
      { title: "Data Entrada", property: "data_entrada", width: '12%', type: 'date', pipe: "date: DD/MM/YYYY HH:mm", },
      { title: "Data Saída", property: "data_saida", width: '12%', type: 'date', pipe: "date: DD/MM/YYYY HH:mm", },
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

  constructor(private ordemServicoService: OrdemServicoService, private websocketService: WebsocketService) { }


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

  public handkeRowActionTable(rowAction) {
    switch (rowAction.action) {
      case 'edit':
        this.openEditModal(rowAction.rowData);
        break;
      case 'delete':
        this.ordemServicoService.delete(rowAction.rowData);
      default:
        break;
    }
    console.log(rowAction)
  }

  closeOrdemServicoForm() {
    this.openModalForm = false
  }

  openCadastrarOrdemServico() {
    this.ordemServicoSelected = null;
    this.openModalForm = true;
  }

  openEditModal(ordemServico) {
    this.ordemServicoSelected = ordemServico;
    this.openModalForm = true;
  }

  openDeleteModal(ordemServico) {
    this.ordemServicoSelected = ordemServico;
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
}
