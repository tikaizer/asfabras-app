import { Component, OnInit } from '@angular/core';

import {Router , ActivatedRoute} from '@angular/router';

import {UsuarioService} from '../../services/usuario.service';

import {Usuario} from '../../services/usuario';

import {Response} from '../../services/response';

import {ConfirmationService, Message} from 'primeng/components/common/api';

import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UsuarioComponent implements OnInit {
    i: number;
    usuarios: Usuario[] = new Array();
    msgs: Message[] = [];
    titulo: string;
    usuario: Usuario = new Usuario();
    constructor(private usuarioService: UsuarioService,
                private messageService: MessageService,
                private activatedRoute: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private router: Router) {}

  ngOnInit() {
    this.titulo = 'Registros Cadastrados';

    /*CHAMA O SERVIÇO E RETORNA TODAS AS PESSOAS CADASTRADAS */
    this.usuarioService.getUsuarios().subscribe(res => this.usuarios = res);


  }

  excluir(id: number, index: number): void {

   /** if(confirm("Deseja realmente excluir esse registro?"+ id)){*/

      /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
      this.usuarioService.excluirUsuario(id).subscribe(response => {

            /**PEGA O RESPONSE DO SERVIÇO */
            const res: Response = <Response>response;

            /*1 = SUCESSO
            * MOSTRAMOS A MENSAGEM RETORNADA PELO SERVIÇO E DEPOIS REMOVEMOS
            O REGISTRO DA TABELA HTML*/
            if (res.id === 1) {
            /**  alert(res.mensagem);*/
              this.usuarios.splice(index, 1);
              this.todosUsuario();
              this.goConsulta();
            } else {
              /*0 = EXCEPTION GERADA NO SERVIÇO JAVA */
              /**alert(res.mensagem);*/
              this.todosUsuario();
              this.goConsulta();
            }
        },
        (erro) => {
             /*MOSTRA ERROS NÃO TRATADOS */
             alert(erro);
             this.todosUsuario();
             this.goConsulta();
        });
    /**}*/

  }

  editar(id: number): void {
   /** this.usuarioService.getUsuario(id).subscribe(res => this.usuario = res);*/
   this.router.navigate(['editar', id]);

  }
  redireciona() {
    this.router.navigate(['cadastro']);
  }

  goConsulta() {
    this.router.navigate(['consulta']);
  }

  perguntaExcluir(id: number, index: number) {
    this.confirmationService.confirm({
        message: 'Confirma Excluir?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.msgs = [{severity: 'danger', summary: 'Confirmed', detail: 'You have accepted'}];
            this.excluir(id, index);
        },
        reject: () => {
            this.msgs = [{severity: 'danger', summary: 'Rejected', detail: 'You have rejected'}];
            this.goConsulta();
        }
    });
  }
  


  todosUsuario() {
    this.usuarioService.getUsuarios().subscribe(res => this.usuarios = res);
  }

  onConfirm(id: number, index: number) {
    //console.log("confirme :" + id)
    this.excluir(id, index);
    this.messageService.clear('c');
    this.todosUsuario();
    this. goConsulta();
    
  }

  onReject() {
    this.messageService.clear('c');
    this. goConsulta();
  }

  clear() {
    this.messageService.clear();
  }

  showConfirm(){
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'Dejesa Excluir?', detail:'Confirma exclusão!'});
}
}


