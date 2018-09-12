import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrlService: string;
  headers: Headers;
  options: any;
  model :String = "clientes/";
  
  constructor(private http: Http,
              private configService: ConfigService) { 

                /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
                this.baseUrlService = configService.getUrlService() ;
                /*ADICIONANDO O JSON NO HEADER */
                this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
                this.options = new RequestOptions({ headers: this.headers });
              }
     /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
     getClientes() {
      return this.http.get(this.baseUrlService + this.model).map(res => res.json());
  }

  /**ADICIONA UMA NOVA PESSOA */
  addCliente(cliente :Cliente) {
      return this.http.post(this.baseUrlService + this.model, JSON.stringify(cliente), this.options)
      .map(res => res.json());
  }
  /**EXCLUI UMA PESSOA */
  excluirCliente(id: number) {
      return this.http.delete(this.baseUrlService + this.model + id).map(res => res.json());
  }
  /**CONSULTA UMA PESSOA PELO CÓDIGO */
  getCliente(id: number) {
      return this.http.get(this.baseUrlService + this.model + id).map(res => res.json());
  }
  /**ATUALIZA INFORMAÇÕES DA PESSOA */
  atualizarCliente(cliente :Cliente) {
      return this.http.put(this.baseUrlService + this.model, JSON.stringify(cliente), this.options)
      .map(res => res.json());
  }

}
