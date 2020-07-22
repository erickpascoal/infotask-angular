import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  public tableConfig: any;

  @Input()
  public tableContent: [];

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

    if (!pipe) {
      return value;
    } else {
      if (pipe.indexOf('date') >= 0) {
        const format = pipe.replace('date:', '');
        return moment(value).format(format);
      }
    }
  }

  public sendFilter() {
    this.queryEmmiter.emit(this.tableConfig);
  }

  onClickHeaderColumn(column) {
    if (!column.sortDir) {
      column.sortDir = 'asc';
    } else if (column.sortDir == 'asc') {
      column.sortDir = 'desc';
    } else if (column.sortDir == 'desc') {
      column.sortDir = 'asc';
    }
    this.tableConfig.columnSort = column;
    this.sendFilter();
  }

  onEnterSearch() {
    this.tableConfig.search = this.search;
    this.tableConfig.page = 1;
    this.sendFilter();
  }

  public onClickNextPage() {
    this.tableConfig.page += 1;
    this.sendFilter();
  }

  public onClickPreviusPage() {
    this.tableConfig.page -= 1;
    this.sendFilter();
  }

  public setRowsPerPage() {
    this.tableConfig.rowsPerPage = this.rowsPerPage;
    this.tableConfig.page = 1;
    this.sendFilter();
  }

  public setPage(page: number) {
    this.tableConfig.page = page;
    this.sendFilter();
  }

  public getPages(): number[] {
    let countPages = +(+this.tableConfig.countData / +this.tableConfig.rowsPerPage);
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
}
