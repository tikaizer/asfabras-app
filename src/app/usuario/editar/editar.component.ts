import { Component, OnInit, Injectable } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../services/usuario';
import { Perfil } from '../../services/perfil';

import { ConfirmationService, Message } from 'primeng/components/common/api';

import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [ConfirmationService, MessageService]

})



export class EditarComponent implements OnInit {
  perfis: Perfil[] = new Array();
  titulo: string;
  usuario: Usuario = new Usuario();
  botao: String = 'Editar';
  msgs: Message[] = [];
  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

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
  goConsulta() {
    this.router.navigate(['/consulta']);
  }

  salvar() {
    this.usuarioService.atualizarUsuario(this.usuario).subscribe(response => {

      // PEGA O RESPONSE DO RETORNO DO SERVIÇO
      const res: Response = <Response>response;

      /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
        E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/

      this.usuarioService.getUsuarios();
      this.goConsulta();
    },
      (erro) => {
        /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
         EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */
        alert(erro);
      });
  }

  confirm1() {
    this.confirmationService.confirm({
      message: 'Confirma Edição?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
        this.salvar();
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
        this.goConsulta();
      }
    });

  }
  onConfirm() {
    this.salvar();
    this.messageService.clear('c');
    //this.goConsulta();

  }
  onReject() {
    this.messageService.clear('c');
    this.goConsulta();
  }

  clear() {
    this.messageService.clear();
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'info', summary: 'Edição?', detail: 'Confirma edição!' });
  }
}