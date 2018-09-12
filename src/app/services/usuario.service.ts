import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Headers} from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


import {Usuario} from '../services/usuario';
import {ConfigService} from './config.service';
import { Perfil } from './perfil';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrlService = '';
  private headers: Headers;
  private options: RequestOptions;
  private perfil: String = 'perfil/';

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
     getUsuarios() {
         return this.http.get(this.baseUrlService + 'usuarios/').map(res => res.json());

     } 

     /**ADICIONA UMA NOVA PESSOA */
     addUsuario(usuario: Usuario) {
         return this.http.post(this.baseUrlService + 'usuarios/', JSON.stringify(usuario), this.options)
         .map(res => res.json());
     }
     /**EXCLUI UMA PESSOA */
     excluirUsuario(id: number) {
         return this.http.delete(this.baseUrlService + 'usuarios/' + id).map(res => res.json());
     }
     /**CONSULTA UMA PESSOA PELO CÓDIGO */
     getUsuario(id: number) {
         return this.http.get(this.baseUrlService + 'usuarios/' + id).map(res => res.json());
     }
     /**ATUALIZA INFORMAÇÕES DA PESSOA */
     atualizarUsuario(usuario: Usuario) {
         return this.http.put(this.baseUrlService + 'usuarios/', JSON.stringify(usuario), this.options)
         .map(res => res.json());
     }
     getPerfil() {
        return this.http.get(this.baseUrlService + 'perfil/').map(res => res.json());
     }
}
