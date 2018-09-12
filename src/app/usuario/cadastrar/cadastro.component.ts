import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {UsuarioService} from '../../services/usuario.service';

import {Usuario} from '../../services/usuario';

import {Response} from '../../services/response';

import { Observable } from 'rxjs/Observable';
import { Perfil } from '../../services/perfil';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  [x: string]: any;
  titulo: string;
  usuario: Usuario = new Usuario();
  perfis: Perfil[] = new Array();
  botao: String = 'Salvar';

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.usuarioService.getPerfil().subscribe(res => this.perfis = res);
    this.activatedRoute.params.subscribe(parametro => {


      if (parametro['id'] === undefined) {

        this.titulo = 'Cadastro de Usuário';

      } else {

        this.titulo = 'Editar Cadastro Usuário';
        this.usuarioService.getUsuario(Number(parametro['id'])).subscribe(res => this.usuario = res);
      }


    });

  }

  salvar(): void {

    /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
    if (this.usuario.id === undefined) {

      /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
      this.usuarioService.addUsuario(this.usuario).subscribe(response => {

         // PEGA O RESPONSE DO RETORNO DO SERVIÇO
         const res: Response = <Response>response;

         /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
         E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
         if (res.id === 1) {
          alert(res.mensagem);
          this.usuario = new Usuario();
          this.usuarioService.getUsuarios();
          this.goConsulta();
         } else {
           /*
           ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
           NO SERVIDOR (CODIGO = 0)*/
           alert(res.mensagem);
           this.goConsulta();
         }
       },
       (erro) => {
         /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
           EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */
          alert(erro);
          this.goConsulta();
       });

    } else {

      /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
      this.usuarioService.atualizarUsuario(this.usuario).subscribe(response => {

      // PEGA O RESPONSE DO RETORNO DO SERVIÇO
      const res: Response = <Response>response;

       /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
         E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/
      if (res.id === 1) {
        this. addSingle();
        alert(res.mensagem);
        this.goConsulta();
      } else {
        /*ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
        NO SERVIDOR (CODIGO = 0)*/
         alert(res.mensagem);
       }
       this.usuarioService.getUsuarios();
       this.goConsulta();
     },
     (erro) => {
       /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
        EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */
        alert(erro);
     });
    }

  }
  goConsulta() {
    this.router.navigate(['/consulta']);
  }
  addSingle() {
    this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Via MessageService'});
  }
  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
  }
}
