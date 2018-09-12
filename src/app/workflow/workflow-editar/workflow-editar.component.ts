import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/components/common/api';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import { Workflow } from '../../services/workflow';
import { WorkflowService } from '../../services/workflow.service';
import { jsonpFactory } from '@angular/http/src/http_module';
import { Cliente } from '../../services/cliente';
import { Setor } from '../../services/setor';
import { Usuario } from '../../services/usuario';
import { Tarefa } from '../../services/tarefa';

@Component({
  selector: 'app-workflow-editar',
  templateUrl: './workflow-editar.component.html',
  styleUrls: ['./workflow-editar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class WorkflowEditarComponent implements OnInit {
  work: Workflow = new Workflow();
  cliente:  Cliente = new Cliente();
  usuario: Usuario = new Usuario();
  setor: Setor = new Setor();
  tarefa: Tarefa = new Tarefa();
  titulo: string;
  botao: string;
  msgs: Message[] = [];
  
  constructor(
    private workflowService: WorkflowService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.titulo = "Editar Work";
    this.botao = "Editar";

    this.activatedRoute.params.subscribe(parametro => {

      this.workflowService.getWork(Number(parametro['id'])).subscribe(res => this.work = res);    
      console.log(this.work.id);
    });
    
  }
  goConsulta() {
    this.router.navigate(['/workflow']);
  }

  salvar() {
    this.workflowService.atualizarWork(this.work).subscribe(response => {

      // PEGA O RESPONSE DO RETORNO DO SERVIÇO
      const res: Response = <Response>response;
      /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
        E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/

      this.workflowService.getWorks();
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


