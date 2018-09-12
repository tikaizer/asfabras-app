import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Workflow } from './workflow';


@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  baseUrlService: string;
  headers: Headers;
  options: any;
  model :String = "workflow/";
  constructor(private http: Http,
              private configService: ConfigService) { 


/**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
this.baseUrlService = configService.getUrlService() ;
/*ADICIONANDO O JSON NO HEADER */
this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
this.options = new RequestOptions({ headers: this.headers });  
}
getWorks() {
  return this.http.get(this.baseUrlService + this.model).map(res => res.json());
}

/**ADICIONA  */
addWork(work: Workflow) {
  return this.http.post(this.baseUrlService + this.model, JSON.stringify(work), this.options)
  .map(res => res.json());
}
/**EXCLUI */
excluirWork(id: number) {
  return this.http.delete(this.baseUrlService + this.model + id).map(res => res.json());
}
/**CONSULTA  PELO CÓDIGO */
getWork(id: number) {
  return this.http.get(this.baseUrlService + this.model + id).map(res => res.json());
}
/**ATUALIZA INFORMAÇÕES  */
atualizarWork(work: Workflow) {
  return this.http.put(this.baseUrlService + this.model, JSON.stringify(work), this.options)
  .map(res => res.json());
}
}
