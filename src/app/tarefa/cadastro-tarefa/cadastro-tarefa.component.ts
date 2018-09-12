import { Component, OnInit } from '@angular/core';
import { Tarefa } from '../../services/tarefa';
import { TarefaService } from '../../services/tarefa.service';
import {Response} from '../../services/response';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService, Message } from 'primeng/api';


@Component({
  selector: 'app-cadastro-tarefa',
  templateUrl: './cadastro-tarefa.component.html',
  styleUrls: ['./cadastro-tarefa.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CadastroTarefaComponent implements OnInit {
 
  tarefa:Tarefa = new Tarefa();
  titulo: String;
  botao: String;
  constructor(private tarefaService: TarefaService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
        this.titulo = "Cadastro Tarefa";
        this.botao = "Salvar";
  }

  salvar(): void {   
       /*  console.log(this.tarefa);*/
      /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
      this.tarefaService.addTarefa(this.tarefa).subscribe(response => {

         // PEGA O RESPONSE DO RETORNO DO SERVIÇO
         const res: Response = <Response>response;

         /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
         E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
         if (res.id === 1) {        
          alert(res.mensagem);         
          this. goConsulta();  
         } else {           /*
           ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
           NO SERVIDOR (CODIGO = 0)*/
           //alert(res.mensagem); 
           this. goConsulta();      
         }
       },
       (erro) => {
         /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
           EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API*/
          alert(erro);
          this. goConsulta();       
          
       });
    }
  
    goConsulta(){
      this.router.navigate(['/tarefas']);
    }

    showTopLeft() {
      this.messageService.add({key: 'tl', severity:'info', summary: 'this.res.mensage', detail:'Order submitted'});
  }

  
}