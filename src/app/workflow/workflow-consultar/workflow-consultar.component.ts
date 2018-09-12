import { Component, OnInit } from '@angular/core';
import {Response} from '../../services/response';
import {ConfirmationService, Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {Router , ActivatedRoute} from '@angular/router';
import { Workflow } from '../../services/workflow';
import { WorkflowService } from '../../services/workflow.service';

@Component({
  selector: 'app-workflow-consultar',
  templateUrl: './workflow-consultar.component.html',
  styleUrls: ['./workflow-consultar.component.css'],
  providers: [ConfirmationService, MessageService]
})

export class WorkflowConsultarComponent implements OnInit {
  works: Workflow[] = new Array();
  msgs: Message[] = [];
  titulo: string;
  work: Workflow = new Workflow();
  constructor(private workflowService:WorkflowService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit() {

    this.titulo = 'Registros Cadastrados';
    /*CHAMA O SERVIÇO E RETORNA TODAS AS PESSOAS CADASTRADAS */   
    this.buscaWorks();
  }
  buscaWorks(){
    this.workflowService.getWorks().subscribe(res => this.works = res);  
   // console.log(this.works);
  }

  excluir(id: number, index: number): void {
    //console.log(id , index);
    /** if(confirm("Deseja realmente excluir esse registro?"+ id)){*/
 
       /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
       this.workflowService.excluirWork(id).subscribe(response => {
 
               this.buscaWorks();
               this.goConsulta();
             
         },
         (erro) => {
              /*MOSTRA ERROS NÃO TRATADOS */
              alert(erro);
              this.buscaWorks();
              this.goConsulta();
         });
     /**}*/
 
   }
 
   editar(id: number): void {
    /** this.usuarioService.getUsuario(id).subscribe(res => this.usuario = res);*/
    this.router.navigate(['workflow-editar', id]);
    
    console.log(id);
   }
   redireciona() {
     this.router.navigate(['workflow-cadastro']);
   }
 
   goConsulta() {
     this.router.navigate(['workflow']);
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
    
   onConfirm(id: number, index: number) {
     //console.log("confirme :" + id)
     this.excluir(id, index);
     this.messageService.clear('c');
     this.buscaWorks();
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
