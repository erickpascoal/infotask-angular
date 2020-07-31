import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private http: HttpClient) { }

  public url = environment.endpointBackend;

  findAll(tableConfig: any) {
    let httpParams = new HttpParams();

    if(tableConfig) {
      httpParams = httpParams.append("tableConfig", JSON.stringify(tableConfig));
    }

    return this.http.get(`${this.url}/servico`, {
      headers: null,
      params: httpParams
    }).toPromise();
  }

  create(servico: any) {
    return this.http.post(`${this.url}/servico`, servico).toPromise();
  }

  update(servico: any) {
    return this.http.put(`${this.url}/servico/${servico.id}`, servico).toPromise();
  }

  delete(servico: any) {
    return this.http.delete(`${this.url}/servico/${servico.id}`).toPromise();
  }
}
