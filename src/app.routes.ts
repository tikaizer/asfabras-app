import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';

import { UsuarioComponent } from './app/usuario/consulta/usuario.component';
import { CadastroComponent } from './app/usuario/cadastrar/cadastro.component';
import { EditarComponent } from './app/usuario/editar/editar.component';
import { HomeComponent } from './app/home/home.component';
import { ConsultaTarefaComponent } from './app/tarefa/consulta-tarefa/consulta-tarefa.component';
import { CadastroTarefaComponent } from './app/tarefa/cadastro-tarefa/cadastro-tarefa.component';
import { EditaTarefaComponent } from './app/tarefa/edita-tarefa/edita-tarefa.component';
import { SetorCadastroComponent } from './app/setor/setor-cadastro/setor-cadastro.component';
import { SetorEditarComponent } from './app/setor/setor-editar/setor-editar.component';
import { SetorConsultaComponent } from './app/setor/setor-consulta/setor-consulta.component';
import { ClienteConsultaComponent } from './app/cliente/cliente-consulta/cliente-consulta.component';
import { ClienteEditaComponent } from './app/cliente/cliente-edita/cliente-edita.component';
import { ClienteCadastroComponent } from './app/cliente/cliente-cadastro/cliente-cadastro.component';
import { WorkflowCadastroComponent } from './app/workflow/workflow-cadastro/workflow-cadastro.component';
import { WorkflowEditarComponent } from './app/workflow/workflow-editar/workflow-editar.component';
import { WorkflowConsultarComponent } from './app/workflow/workflow-consultar/workflow-consultar.component';
import { LoginComponent } from './app/usuario/login/login.component';


 
const appRoutes: Routes = [   
    { path: '',                           component: HomeComponent },    
    { path: 'home',                       component: HomeComponent },
    { path: 'consulta',                   component: UsuarioComponent },
    { path: 'cadastro',                   component: CadastroComponent},
    { path: 'cadastro/:id',               component: CadastroComponent},
    { path: 'editar',                     component: EditarComponent},
    { path: 'editar/:id',                 component: EditarComponent},
    { path: 'tarefas',                    component: ConsultaTarefaComponent},
    { path: 'cadastro-tarefa',            component: CadastroTarefaComponent},
    { path: 'edita-tarefa',               component: EditaTarefaComponent},
    { path: 'edita-tarefa/:id',           component: EditaTarefaComponent},
    { path: 'setor-cadastro' ,            component: SetorCadastroComponent},
    { path: 'setor-cadastro/:id' ,        component: SetorCadastroComponent},
    { path: 'setor-edita/:id' ,           component: SetorEditarComponent},
    { path: 'setor-edita' ,               component: SetorEditarComponent},
    { path: 'setor' ,                     component: SetorConsultaComponent},
    { path: 'cliente' ,                   component: ClienteConsultaComponent},
    { path: 'cliente-edita' ,             component: ClienteEditaComponent},
    { path: 'cliente-edita/:id' ,         component: ClienteEditaComponent},
    { path: 'cliente-cadastro' ,          component: ClienteCadastroComponent},
    { path: 'cliente-cadastro/:id' ,      component: ClienteCadastroComponent},
    { path: 'workflow-cadastro/:id' ,     component: WorkflowCadastroComponent},
    { path: 'workflow-cadastro' ,         component: WorkflowCadastroComponent},
    { path: 'workflow-editar/:id' ,       component: WorkflowEditarComponent},
    { path: 'workflow-editar' ,           component: WorkflowEditarComponent},
    { path: 'workflow' ,                  component: WorkflowConsultarComponent},
    { path: 'login' ,                     component: LoginComponent}
   
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
