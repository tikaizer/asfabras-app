import { Component, OnInit } from '@angular/core';
import { Setor } from '../../services/setor';
import { Router, ActivatedRoute } from '@angular/router';

import {MessageService} from 'primeng/components/common/messageservice';
import { ConfirmationService, Message } from 'primeng/api';
import { SetorService } from '../../services/setor.service';

@Component({
  selector: 'app-setor-editar',
  templateUrl: './setor-editar.component.html',
  styleUrls: ['./setor-editar.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SetorEditarComponent implements OnInit {
  setor: Setor = new Setor();
  titulo: String;
  botao: String;
  msgs: Message[] = [];
  constructor(private setorService: SetorService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(parametro => {
      this.botao = "Editar";
      this.titulo = 'Editar Setores';
      this.setorService.getSetor(Number(parametro['id'])).subscribe(res => this.setor = res);
  });
  }

  goConsulta(){
    this.router.navigate(['/setor']);
  }
  
  salvar() {
        this.setorService.atualizarSetor(this.setor).subscribe(response => {

                  // PEGA O RESPONSE DO RETORNO DO SERVIÇO
                  const res: Response = <Response>response;

                   /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
                     E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/

                   this.setorService.getSetores();
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
