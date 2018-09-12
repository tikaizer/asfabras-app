import { Component, OnInit } from '@angular/core';
import { Response } from '../../services/response';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { WorkflowService } from '../../services/workflow.service';
import { Workflow } from '../../services/workflow';
import { Tarefa } from '../../services/tarefa';
import { TarefaService } from '../../services/tarefa.service';
import { Setor } from '../../services/setor';
import { SetorService } from '../../services/setor.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../services/cliente';


@Component({
  selector: 'app-workflow-cadastro',
  templateUrl: './workflow-cadastro.component.html',
  styleUrls: ['./workflow-cadastro.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class WorkflowCadastroComponent implements OnInit {
  work: Workflow = new Workflow();
  tarefas: Tarefa[] = new Array();
  setores: Setor[] = new Array();
  clientes: Cliente[] = new Array();
  titulo: String;
  botao: String;

  constructor(private workflowService: WorkflowService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private tarefaService: TarefaService,
    private setorService: SetorService,
    private clienteService: ClienteService) { }

  ngOnInit() {
    
    this.titulo = "Cadastro";
    this.botao = "Salvar";
  }

  buscarTarefas() {
    this.tarefaService.getTarefas().subscribe(res => this.tarefas = res);
    //console.log(this.tarefas);
  }

  buscarSetores() {
    this.setorService.getSetores().subscribe(res => this.setores = res);
    //console.log(this.setores);
  }
  buscarClientes() {
    this.clienteService.getClientes().subscribe(res => this.clientes = res);
    //console.log(this.clientes);
  }

  salvar(): void {
    console.log(this.work);
    /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
    this.workflowService.addWork(this.work).subscribe(response => {

      // PEGA O RESPONSE DO RETORNO DO SERVIÇO
      const res: Response = <Response>response;

      /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
      E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
      if (res.id === 1) {
        alert(res.mensagem);
        this.goConsulta();
      } else {           /*
        ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
        NO SERVIDOR (CODIGO = 0)*/
        //alert(res.mensagem); 
        this.goConsulta();
      }
    },
      (erro) => {
        /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
          EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API*/
        alert(erro);
        this.goConsulta();

      });
  }

  goConsulta() {
    this.router.navigate(['/workflow']);
  }

  showTopLeft() {
    this.messageService.add({ key: 'tl', severity: 'info', summary: 'this.res.mensage', detail: 'Order submitted' });
  }


}
