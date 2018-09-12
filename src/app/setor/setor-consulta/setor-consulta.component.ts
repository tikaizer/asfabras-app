import { Component, OnInit } from '@angular/core';
import { TarefaService } from '../../services/tarefa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService , Message } from 'primeng/api';
import {Response} from '../../services/response';
import {ToastModule} from 'primeng/toast';
import { SetorService } from '../../services/setor.service';
import { Setor } from '../../services/setor';


@Component({
  selector: 'app-setor-consulta',
  templateUrl: './setor-consulta.component.html',
  styleUrls: ['./setor-consulta.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SetorConsultaComponent implements OnInit {
  setor: Setor = new Setor();
  setores: Setor[] = new Array();
  titulo: String;
  msgs: Message[] = [];
  constructor(private setorService : SetorService,
              private router: Router,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.titulo ="Setores Cadastrados";
    this.buscarSetores();

  }

  buscarSetores(){
    this.setorService.getSetores().subscribe(res => this.setores = res);
   
  }
  redireciona(){   
    this.router.navigate(['setor-cadastro']);
  }
  
  excluir(id: number, index: number): void {
    console.log("excluir :" + id)
    /** if(confirm("Deseja realmente excluir esse registro?"+ id)){*/
 
       /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
       this.setorService.excluirSetor(id).subscribe(response => {
 
             /**PEGA O RESPONSE DO SERVIÇO */
             const res: Response = <Response>response;
 
             this.buscarSetores();           
            
         },
         (erro) => {
              /*MOSTRA ERROS NÃO TRATADOS */
              alert(erro);
              this.buscarSetores();
              
         });
     /**}*/
 
   }
   editar(id: number): void {
    /** this.usuarioService.getUsuario(id).subscribe(res => this.usuario = res);*/
    this.router.navigate(['setor-edita', id]);
 
   }

   onConfirm(id: number, index: number) {
    //console.log("confirme :" + id)
    this.excluir(id, index);
    this.messageService.clear('c');
    this.buscarSetores();
    
  }

  onReject() {
    this.messageService.clear('c');
    this.buscarSetores();
  }

  clear() {
    this.messageService.clear();
  }

  showConfirm(){
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'Dejesa Excluir?', detail:'Confirma exclusão!'});
}

}
