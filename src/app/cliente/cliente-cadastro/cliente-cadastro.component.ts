import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../services/cliente';
import {Response} from '../../services/response';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { ClienteService } from '../../services/cliente.service';

import 'rxjs/add/operator/map';
import { getLocaleDayPeriods } from '@angular/common';
import { Http } from '@angular/http';


@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ClienteCadastroComponent implements OnInit {

  cliente :Cliente = new Cliente();
  clientes: Cliente [] = new Array();
  botao: String;
  titulo: String;
  resultado: Cliente;
  constructor(private clienteService: ClienteService,
              private http : Http,
              private router: Router,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.botao = "Salvar";
    this.titulo = "Cadastro Cliente";
  }

  salvar(): void {   
   /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
   this.clienteService.addCliente(this.cliente).subscribe(response => {

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
   this.router.navigate(['/cliente']);
 }
 showTopLeft() {
   this.messageService.add({key: 'tl', severity:'info', summary: 'this.res.mensage', detail:'Order submitted'});
}

consultaCep(cep){
 console.log(cep);
 cep = cep.replace(/\D/g, '');
 console.log(cep);
 var validacep = (/^[0-9]{8}$/);
 this.http.get(`//viacep.com.br/ws/${cep}/json`)
 .map(dados => dados.json())
 .subscribe(dados => this.cliente = this.converterRespostaParaCep(dados));;


 }

 buscar(cep:string){
  cep = cep.replace(/\D/g, '');
  console.log(cep);
  return this.http
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .subscribe(data => this.resultado = this.converterRespostaParaCep(data));

}

private converterRespostaParaCep(cepNaResposta):Cliente{
    
    this.cliente.cep = cepNaResposta.cep;
    this.cliente.endereco= cepNaResposta.logradouro;    
    this.cliente.bairro = cepNaResposta.bairro;
    this.cliente.cidade = cepNaResposta.localidade;
    this.cliente.uf = cepNaResposta.uf;
    console.log(this.cliente);
    return this.cliente;
}

}