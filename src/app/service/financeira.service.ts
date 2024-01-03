import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinanceiraServiceService {

  constructor( private httpClient: HttpClient) { }

  getClientes() {
    return this.httpClient.get('http://localhost:3001/cliente');
  }

  postCliente(body: any) {
    return this.httpClient.post('http://localhost:3001/cliente',  body )
  }

  patchCliente(body: any) {
    return this.httpClient.patch(`http://localhost:3001/cliente/${body.id}`,  body )
  }

  deleteCliente(id: any) {
    return this.httpClient.delete(`http://localhost:3001/cliente/${id}` )
  }
}
