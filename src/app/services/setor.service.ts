import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ConfigService } from './config.service';
import { Setor } from './setor';


@Injectable({
  providedIn: 'root'
})
export class SetorService {
  baseUrlService: string;
  headers: Headers;
  options: any;

    constructor(private http: Http,
    private configService: ConfigService) {

         /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
         this.baseUrlService = configService.getUrlService() ;
         /*ADICIONANDO O JSON NO HEADER */
         this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
         this.options = new RequestOptions({ headers: this.headers });
     }

     getSetores() {
      return this.http.get(this.baseUrlService + 'setor/').map(res => res.json());
  }
    /**ADICIONA UMA NOVA PESSOA */
    addSetor(setor: Setor) {
        return this.http.post(this.baseUrlService + 'setor/', JSON.stringify(setor), this.options)
        .map(res => res.json());
    }
    /**EXCLUI UMA PESSOA */
    excluirSetor(id: number) {
        return this.http.delete(this.baseUrlService + 'setor/' + id).map(res => res.json());
    }
    /**CONSULTA UMA PESSOA PELO CÓDIGO */
    getSetor(id: number) {
        return this.http.get(this.baseUrlService + 'setor/' + id).map(res => res.json());
    }
    /**ATUALIZA INFORMAÇÕES DA PESSOA */
    atualizarSetor(setor: Setor) {
        return this.http.put(this.baseUrlService + 'setor/', JSON.stringify(setor), this.options)
        .map(res => res.json());
    }
}
