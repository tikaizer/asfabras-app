import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http' ;
import { RouterModule, Routes } from '@angular/router';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';


import {routing} from './../app.routes';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import {GrowlModule} from 'primeng/growl';
import {CheckboxModule} from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import {FieldsetModule} from 'primeng/fieldset';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TableModule} from 'primeng/table';
import {MenubarModule} from 'primeng/menubar';
import {TooltipModule} from 'primeng/tooltip';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';

import { UsuarioComponent } from './usuario/consulta/usuario.component';
import { CadastroComponent } from './usuario/cadastrar/cadastro.component';
import { EditarComponent } from './usuario/editar/editar.component';



import {ConfigService} from './services/config.service';
import {UsuarioService} from './services/usuario.service';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu/menu.component';
import { CadastroTarefaComponent } from './tarefa/cadastro-tarefa/cadastro-tarefa.component';
import { ConsultaTarefaComponent } from './tarefa/consulta-tarefa/consulta-tarefa.component';
import { EditaTarefaComponent } from './tarefa/edita-tarefa/edita-tarefa.component';
import { TarefaService } from './services/tarefa.service';
import { SetorCadastroComponent } from './setor/setor-cadastro/setor-cadastro.component';
import { SetorEditarComponent } from './setor/setor-editar/setor-editar.component';
import { SetorConsultaComponent } from './setor/setor-consulta/setor-consulta.component';
import { ClienteCadastroComponent } from './cliente/cliente-cadastro/cliente-cadastro.component';
import { ClienteConsultaComponent } from './cliente/cliente-consulta/cliente-consulta.component';
import { ClienteEditaComponent } from './cliente/cliente-edita/cliente-edita.component';
import { ClienteService } from './services/cliente.service';
import { KeyFilterModule } from 'primeng/keyfilter';
import { WorkflowCadastroComponent } from './workflow/workflow-cadastro/workflow-cadastro.component';
import { WorkflowEditarComponent } from './workflow/workflow-editar/workflow-editar.component';
import { WorkflowConsultarComponent } from './workflow/workflow-consultar/workflow-consultar.component';
import { WorkflowService } from './services/workflow.service';
import { LoginComponent } from './usuario/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    CadastroComponent,
    EditarComponent,
    HomeComponent,
    MenuComponent,
    CadastroTarefaComponent,
    ConsultaTarefaComponent,
    EditaTarefaComponent,
    SetorCadastroComponent,
    SetorEditarComponent,
    SetorConsultaComponent,
    ClienteCadastroComponent,
    ClienteConsultaComponent,
    ClienteEditaComponent,
    WorkflowCadastroComponent,
    WorkflowEditarComponent,
    WorkflowConsultarComponent,
    LoginComponent
    

    ],
  imports: [
    BrowserModule,
    RouterModule, 
    HttpClientModule, 
    CommonModule,
    InputTextModule,
    ChartModule,
    routing,
    FormsModule,
    MenubarModule,
    HttpModule,
    BrowserAnimationsModule,
    CalendarModule,
    TableModule,
    EditorModule,
    GrowlModule,
    TooltipModule,
    ButtonModule,
    FieldsetModule,
    CheckboxModule,
    InputSwitchModule,
    PasswordModule,
    ToastModule,
    InputMaskModule,
    ConfirmDialogModule,
    KeyFilterModule,
    CardModule,
    DropdownModule
  
  ],
  providers: [UsuarioService,ConfigService,TarefaService,ClienteService,WorkflowService],
 
  bootstrap: [AppComponent]
})
export class AppModule { }