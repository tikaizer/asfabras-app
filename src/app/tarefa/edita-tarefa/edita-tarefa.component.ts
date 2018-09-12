import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../services/tarefa.service';
import { Router, ActivatedRoute } from '@angular/router';

import {MessageService} from 'primeng/components/common/messageservice';
import { ConfirmationService, Message } from 'primeng/api';
import { Tarefa } from '../../services/tarefa';

@Component({
  selector: 'app-edita-tarefa',
  templateUrl: './edita-tarefa.component.html',
  styleUrls: ['./edita-tarefa.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EditaTarefaComponent implements OnInit {
  tarefa: Tarefa = new Tarefa();
  titulo: String;
  botao: String;
  msgs: Message[] = [];
  constructor(private tarefaService: TarefaService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {   

      this.activatedRoute.params.subscribe(parametro => {
        this.titulo = 'Cadastro de Usuário';
        this.botao = "Editar";
        this.titulo = 'Editar Tarefas';
        this.tarefaService.getTarefa(Number(parametro['id'])).subscribe(res => this.tarefa = res);
    });
  }
  goConsulta(){
    this.router.navigate(['/tarefas']);
  }
  
  salvar() {
        this.tarefaService.atualizarTarefa(this.tarefa).subscribe(response => {

                  // PEGA O RESPONSE DO RETORNO DO SERVIÇO
                  const res: Response = <Response>response;

                   /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
                     E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/

                   this.tarefaService.getTarefas();
                   this.goConsulta();
                 },
                 (erro) => {
                   /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
                    EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */
                    alert(erro);
                 });
                }
                /*
              confirm1() {
                this.confirmationService.confirm({
                    message: 'Confirma Edição?',
                    header: 'Confirmação',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                        this.msgs = [{severity: 'info', summary: 'Confirmed', detail: 'You have accepted'}];
                        this.salvar();
                    },
                    reject: () => {
                        this.msgs = [{severity: 'info', summary: 'Rejected', detail: 'You have rejected'}];
                        this.goConsulta();
                    }
                });

            }
*/
            onConfirm() {              
              this.salvar();
              this.messageService.clear('c');
              this.goConsulta();;
              
            }
            onReject() {
              this.messageService.clear('c');
              this.goConsulta();
            }
          
            clear() {
              this.messageService.clear();
            }
          
            showConfirm(){
              this.messageService.clear();
              this.messageService.add({key: 'c', sticky: true, severity:'info', summary:'Edição?', detail:'Confirma edição!'});
          }
  

}
