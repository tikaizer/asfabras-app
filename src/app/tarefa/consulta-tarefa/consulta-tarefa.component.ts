import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../services/tarefa';
import { TarefaService } from '../../services/tarefa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService , Message } from 'primeng/api';
import {Response} from '../../services/response';
import {ToastModule} from 'primeng/toast';

@Component({
  selector: 'app-consulta-tarefa',
  templateUrl: './consulta-tarefa.component.html',
  styleUrls: ['./consulta-tarefa.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ConsultaTarefaComponent implements OnInit {

  tarefa = new Tarefa();
  tarefas: Tarefa[] = new Array();
  titulo: String;
  msgs: Message[] = [];

  constructor(private tarefaService: TarefaService,
              private router: Router,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.titulo = 'Tarefas Cadastrados';
    this.buscarTarefas();
  }

  buscarTarefas(){
    this.tarefaService.getTarefas().subscribe(res => this.tarefas = res);
   
  }

  redireciona(){   
      this.router.navigate(['cadastro-tarefa']);
    
  }

  excluir(id: number, index: number): void {
    console.log("excluir :" + id)
    /** if(confirm("Deseja realmente excluir esse registro?"+ id)){*/
 
       /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
       this.tarefaService.excluirTarefa(id).subscribe(response => {
 
             /**PEGA O RESPONSE DO SERVIÇO */
             const res: Response = <Response>response;
 
              this.buscarTarefas();             
            
         },
         (erro) => {
              /*MOSTRA ERROS NÃO TRATADOS */
              alert(erro);
              this.buscarTarefas();
              
         });
     /**}*/
 
   }
   editar(id: number): void {
    /** this.usuarioService.getUsuario(id).subscribe(res => this.usuario = res);*/
    this.router.navigate(['edita-tarefa', id]);
 
   }

   onConfirm(id: number, index: number) {
    //console.log("confirme :" + id)
    this.excluir(id, index);
    this.messageService.clear('c');
    this.buscarTarefas();
    
  }

  onReject() {
    this.messageService.clear('c');
    this.buscarTarefas();
  }

  clear() {
    this.messageService.clear();
  }

  showConfirm(){
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'Dejesa Excluir?', detail:'Confirma exclusão!'});
}

}
