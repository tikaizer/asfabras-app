import { Component, OnInit } from '@angular/core';
import { Setor } from '../../services/setor';
import { SetorService } from '../../services/setor.service';
import {Response} from '../../services/response';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-setor-cadastro',
  templateUrl: './setor-cadastro.component.html',
  styleUrls: ['./setor-cadastro.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SetorCadastroComponent implements OnInit {
  
  setor: Setor = new Setor();
  titulo: String;
  botao: String;
  constructor(private setorSerice: SetorService,
              private router: Router,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.titulo = "Cadastro Setor";
    this.botao = "Salvar";
  }
  salvar(): void {   
    /*  console.log(this.tarefa);*/
   /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
   this.setorSerice.addSetor(this.setor).subscribe(response => {

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
   this.router.navigate(['/setor']);
 }

 showTopLeft() {
   this.messageService.add({key: 'tl', severity:'info', summary: 'this.res.mensage', detail:'Order submitted'});
}

}
