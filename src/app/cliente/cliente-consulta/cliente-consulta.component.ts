import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../services/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService , Message } from 'primeng/api';
import {Response} from '../../services/response';
import {ToastModule} from 'primeng/toast';
import { SetorService } from '../../services/setor.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ClienteConsultaComponent implements OnInit {
  cliente : Cliente = new Cliente();
  clientes: Cliente[] = new Array();
  titulo: String;
  msgs: Message[] = [];
  constructor(private clienteService : ClienteService,
              private router: Router,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {

    this.titulo ="Clientes Cadastrados";
    this.buscarClientes();
  }

  buscarClientes(){
    this.clienteService.getClientes().subscribe(res => this.clientes = res);
   
  }
  redireciona(){   
    this.router.navigate(['cliente-cadastro']);
  }
  
  excluir(id: number, index: number): void {
    console.log("excluir :" + id)
    /** if(confirm("Deseja realmente excluir esse registro?"+ id)){*/
 
       /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
       this.clienteService.excluirCliente(id).subscribe(response => {
 
             /**PEGA O RESPONSE DO SERVIÇO */
             const res: Response = <Response>response;
 
             this.buscarClientes();           
            
         },
         (erro) => {
              /*MOSTRA ERROS NÃO TRATADOS */
              alert(erro);
              this.buscarClientes();
              
         });
     /**}*/
 
   }
   editar(id: number): void {
    /** this.usuarioService.getUsuario(id).subscribe(res => this.usuario = res);*/
    this.router.navigate(['cliente-edita', id]);
 
   }

   onConfirm(id: number, index: number) {
    //console.log("confirme :" + id)
    this.excluir(id, index);
    this.messageService.clear('c');
    this.buscarClientes();
    
  }

  onReject() {
    this.messageService.clear('c');
    this.buscarClientes();
  }

  clear() {
    this.messageService.clear();
  }

  showConfirm(){
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'Dejesa Excluir?', detail:'Confirma exclusão!'});
}

}
