import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from './config.service';
import { Tarefa } from './tarefa';

@Injectable({
  providedIn: 'root'
})

export class TarefaService {
  baseUrlService: string;
  headers: Headers;
  options: any;
  model :String = "tarefas/";
  constructor(private http: Http,
              private configService: ConfigService) {

         /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
         this.baseUrlService = configService.getUrlService() ;
         // *this.perfis = "";*/
         /*ADICIONANDO O JSON NO HEADER */
         this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
         this.options = new RequestOptions({ headers: this.headers });
     }
     /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
     getTarefas() {
         return this.http.get(this.baseUrlService + this.model).map(res => res.json());
     }

     /**ADICIONA UMA NOVA PESSOA */
     addTarefa(tarefa: Tarefa) {
         return this.http.post(this.baseUrlService + this.model, JSON.stringify(tarefa), this.options)
         .map(res => res.json());
     }
     /**EXCLUI UMA PESSOA */
     excluirTarefa(id: number) {
         return this.http.delete(this.baseUrlService + this.model + id).map(res => res.json());
     }
     /**CONSULTA UMA PESSOA PELO CÓDIGO */
     getTarefa(id: number) {
         return this.http.get(this.baseUrlService + this.model + id).map(res => res.json());
     }
     /**ATUALIZA INFORMAÇÕES DA PESSOA */
     atualizarTarefa(tarefa: Tarefa) {
         return this.http.put(this.baseUrlService + this.model, JSON.stringify(tarefa), this.options)
         .map(res => res.json());
     }
}

