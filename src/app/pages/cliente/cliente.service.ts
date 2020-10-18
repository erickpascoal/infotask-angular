import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public url = environment.endpointBackend;

  findAll(tableConfig: any) {
    let httpParams = new HttpParams();

    if (tableConfig) {
      httpParams = httpParams.append("tableConfig", JSON.stringify(tableConfig));
    }

    return this.http.get(`${this.url}/cliente`, {
      headers: null,
      params: httpParams
    }).toPromise();
  }

  findAllAtivos() {
    return this.http.get(`${this.url}/cliente/ativos`).toPromise();
  }

  create(cliente: any) {
    return this.http.post(`${this.url}/cliente`, cliente).toPromise();
  }

  update(cliente: any) {
    return this.http.put(`${this.url}/cliente/${cliente.id}`, cliente).toPromise();
  }

  delete(cliente: any) {
    return this.http.delete(`${this.url}/cliente/${cliente.id}`).toPromise();
  }
}
