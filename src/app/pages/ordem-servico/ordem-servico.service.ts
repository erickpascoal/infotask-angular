import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  constructor(private http: HttpClient) { }

  public url = environment.endpointBackend;

  findAll(tableConfig: any) {
    let httpParams = new HttpParams();
    if (tableConfig) {
      httpParams = httpParams.append("tableConfig", JSON.stringify(tableConfig));
    }
    return this.http.get(`${this.url}/ordemServico`, {
      headers: null,
      params: httpParams
    }).toPromise();
  }

  create(ordemServico: any) {
    return this.http.post(`${this.url}/ordemServico`, ordemServico).toPromise();
  }

  update(ordemServico: any) {
    return this.http.put(`${this.url}/ordemServico/${ordemServico.id}`, ordemServico).toPromise();
  }

  delete(ordemServico: any) {
    return this.http.delete(`${this.url}/ordemServico/${ordemServico.id}`).toPromise();
  }
}
