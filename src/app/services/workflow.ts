import { Usuario } from "./usuario";
import { Cliente } from "./cliente";
import { Setor } from "./setor";
import { Tarefa } from "./tarefa";

export class Workflow {

	id:	number;
	titulo: String;
	descricaoWork: string;
	descricaoTarefa: Tarefa;	
	setor:Setor;
	cliente: Cliente;
	usuario: Usuario;
	dataCadastroWorkflow: string;
    prazoWorkflow: string;
    status: boolean;
}
