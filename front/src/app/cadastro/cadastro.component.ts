import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoliciaisService, Policial } from '../services/policiais.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {

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

  constructor(private service: PoliciaisService) {}

  ngOnInit(): void {
    this.listarPoliciais();
  }

  listarPoliciais(): void {
    this.service.listarPoliciais().subscribe(data => this.policiais = data);
  }

  salvar(): void {
    if (this.editando) {
      this.service.atualizarPolicial(this.idEdicao, this.policial).subscribe(() => {
        this.editando = false;
        this.policial = { rg_civil: '', rg_militar: '', cpf: '', data_nascimento: '', matricula: '' };
        this.listarPoliciais();
      });
    } else {
      this.service.cadastrarPolicial(this.policial).subscribe(() => {
        this.policial = { rg_civil: '', rg_militar: '', cpf: '', data_nascimento: '', matricula: '' };
        this.listarPoliciais();
      });
    }
  }

  editar(p: Policial): void {
    this.policial = { ...p };
    this.idEdicao = p.id!;
    this.editando = true;
  }

  excluir(id: number): void {
    this.service.deletarPolicial(id).subscribe(() => this.listarPoliciais());
  }

  // Novo método para cancelar a edição
  cancelarEdicao(): void {
    this.editando = false;
    this.policial = { rg_civil: '', rg_militar: '', cpf: '', data_nascimento: '', matricula: '' };
  }
}