import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../services/cliente';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-cliente-edita',
  templateUrl:'./cliente-edita.component.html',
  styleUrls: ['./cliente-edita.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class ClienteEditaComponent implements OnInit {
  titulo : String;
  botao : String;
  cliente: Cliente= new Cliente();
  constructor(private clienteService : ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {  
    this.activatedRoute.params.subscribe(parametro => {
      this.botao = "Editar";
      this.titulo = 'Editar Clientes';
      this.clienteService.getCliente(Number(parametro['id'])).subscribe(res => this.cliente = res);
  });   
  
}
goConsulta(){
  this.router.navigate(['/cliente']);
}

salvar() {
      this.clienteService.atualizarCliente(this.cliente).subscribe(response => {

                // PEGA O RESPONSE DO RETORNO DO SERVIÇO
                const res: Response = <Response>response;

                 /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
                   E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/

                 this.clienteService.getClientes();
                 this.goConsulta();
               },
               (erro) => {
                 /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
                  EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */
                  alert(erro);
               });
              }

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