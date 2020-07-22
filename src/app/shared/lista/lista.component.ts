import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  @Input()
  public listaConfig: any;

  @Input()
  public dados: [];

  @Output()
  public getDataForPage = new EventEmitter<any>();

  @Output()
  public rowActionEmmiter = new EventEmitter();

  @Output()
  public queryEmmiter = new EventEmitter();

  public pageList: number[];

  public search: string;

  public columnsSort: string;

  public totalPages = 0;

  public rowsPerPage = 10;

  constructor() { }

  ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges) { }

  public onRowActionClicked(action: string, rowData: any): void {
    const userAction: any = {
      action: action,
      rowData: rowData
    };

    this.rowActionEmmiter.emit(userAction);
  }

  public buildValue(data, columnHead, property) {
    const pipe: string = columnHead.pipe;
    const value = data[property];

    if (!pipe || !value) {
      return value;
    } else {
      if (pipe.indexOf('date') >= 0) {
        const format = pipe.replace('date:', '');
        return moment(value).format(format);
      }
    }
  }

  public sendFilter() {
    this.queryEmmiter.emit(this.listaConfig);
  }

  onClickHeaderColumn(column) {
    if (!column.sortDir) {
      column.sortDir = 'asc';
    } else if (column.sortDir == 'asc') {
      column.sortDir = 'desc';
    } else if (column.sortDir == 'desc') {
      column.sortDir = 'asc';
    }
    this.listaConfig.columnSort = column;
    this.sendFilter();
  }

  onEnterSearch() {
    this.listaConfig.search = this.search;
    this.listaConfig.page = 1;
    this.sendFilter();
  }

  public onClickNextPage() {
    this.listaConfig.page += 1;
    this.sendFilter();
  }

  public onClickPreviusPage() {
    this.listaConfig.page -= 1;
    this.sendFilter();
  }

  public setRowsPerPage() {
    this.listaConfig.rowsPerPage = this.rowsPerPage;
    this.listaConfig.page = 1;
    this.sendFilter();
  }

  public setPage(page: number) {
    this.listaConfig.page = page;
    this.sendFilter();
  }

  public getPages(): number[] {
    let countPages = +(+this.listaConfig.countData / +this.listaConfig.rowsPerPage);
    const countSplit = countPages.toString().split('.');
    if (countSplit.length > 1) {
      countPages = +countSplit[0] + 1;
    }
    const pages = [];
    for (let index = 1; index <= countPages; index++) {
      pages.push(index);
    }
    this.totalPages = pages[pages.findIndex(p => p == pages[pages.length - 1])]
    return pages;
  }

  public verificaColunaOrdenada(coluna) {
    return coluna == this.listaConfig.columnSort && this.listaConfig.columnSort.sortDir == 'asc';
  }
}
