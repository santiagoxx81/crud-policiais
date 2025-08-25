import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoliciaisService, Policial } from '../services/policiais.service';

// * Gerenciamento de Componentes e Serviços
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {

  // * Variáveis de Estado
  policiais: Policial[] = [];
  policial: Policial = {
    rg_civil: '',
    rg_militar: '',
    cpf: '',
    data_nascimento: '',
    matricula: ''
  };
  editando = false;
  idEdicao = 0;
  searchCpf: string = ''; // Nova variável para o campo de busca

  // * Construtor e Inicialização
  constructor(private service: PoliciaisService) {}

  ngOnInit(): void {
    this.listarPoliciais();
  }

  // * Métodos de Leitura (GET)
  listarPoliciais(): void {
    // Busca a lista completa de policiais (sem filtros)
    this.service.listarPoliciais().subscribe(data => this.policiais = data);
  }

  // * Método de Busca por CPF
  buscarPorCpf(): void {
    // Envia o valor do campo de busca para o serviço
    this.service.listarPoliciais(this.searchCpf).subscribe({
      next: (data) => {
        this.policiais = data;
      },
      error: (erro) => {
        console.error(erro);
        alert(erro.error.erro || 'Ocorreu um erro ao buscar o policial.');
      }
    });
  }

  // * Métodos de Salvar e Atualizar (POST e PUT)
  salvar(): void {
    if (this.editando) {
      this.service.atualizarPolicial(this.idEdicao, this.policial).subscribe({
        next: () => {
          this.editando = false;
          this.policial = { rg_civil: '', rg_militar: '', cpf: '', data_nascimento: '', matricula: '' };
          this.listarPoliciais();
        },
        error: (erro) => {
          console.error(erro);
          alert(erro.error.erro || 'Ocorreu um erro desconhecido.');
        }
      });
    } else {
      this.service.cadastrarPolicial(this.policial).subscribe({
        next: () => {
          this.policial = { rg_civil: '', rg_militar: '', cpf: '', data_nascimento: '', matricula: '' };
          this.listarPoliciais();
        },
        error: (erro) => {
          console.error(erro);
          alert(erro.error.erro || 'Ocorreu um erro desconhecido.');
        }
      });
    }
  }

  // * Método para Preencher o Formulário de Edição
  editar(p: Policial): void {
    this.policial = { ...p };
    this.idEdicao = p.id!;
    this.editando = true;
  }

  // * Método de Exclusão (DELETE)
  excluir(id: number): void {
    if (confirm('Deseja realmente excluir este cadastro?')) {
      this.service.deletarPolicial(id).subscribe(() => this.listarPoliciais());
    }
  }

  // * Método de Cancelamento de Edição
  cancelarEdicao(): void {
    this.editando = false;
    this.policial = { rg_civil: '', rg_militar: '', cpf: '', data_nascimento: '', matricula: '' };
    this.listarPoliciais(); // Retorna para a lista completa
  }
}