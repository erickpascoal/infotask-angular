import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoServicoService {

  constructor(private http: HttpClient) { }

  public url = environment.endpointBackend;

  findAll(tableConfig: any) {
    let httpParams = new HttpParams();

    if(tableConfig) {
      httpParams = httpParams.append("tableConfig", JSON.stringify(tableConfig));
    }

    return this.http.get(`${this.url}/tipoServico`, {
      headers: null,
      params: httpParams
    }).toPromise();
  }

  findAtivos() {
    return this.http.get(`${this.url}/tipoServico/ativos`).toPromise();
  }

  create(tipoServico: any) {
    return this.http.post(`${this.url}/tipoServico`, tipoServico).toPromise();
  }

  update(tipoServico: any) {
    return this.http.put(`${this.url}/tipoServico/${tipoServico.id}`, tipoServico).toPromise();
  }

  delete(tipoServico: any) {
    return this.http.delete(`${this.url}/tipoServico/${tipoServico.id}`).toPromise();
  }
}
