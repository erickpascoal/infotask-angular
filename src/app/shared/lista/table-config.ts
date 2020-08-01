import { TableTopAction } from './table-top-action';
import { TableColumn } from './table-column';
import { TableRowAction } from './table-row-action';

export class TableConfig {
    columns: TableColumn[];
    rowActions: TableRowAction[];
    topActions: TableTopAction[];
    rowsPerPage: number;
    page: number;
    countData: number;
    createButton: boolean;
    name: string;
}
