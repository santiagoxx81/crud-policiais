import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Policial {
    // ... todos os campos
    id?: number;
    rg_civil: string;
    rg_militar: string;
    cpf: string;
    data_nascimento: string;
    matricula: string;
}
@Injectable({
    providedIn: 'root'
})
export class PoliciaisService {
    private api = 'http://localhost:3012/policiais';

    constructor(private http: HttpClient) { }

    listarPoliciais(cpf?: string, rg?: string): Observable<Policial[]> {
        let params = new HttpParams();
        if (cpf) {
            params = params.set('cpf_input', cpf);
        } else if (rg) {
            params = params.set('rg_input', rg);
        }
        return this.http.get<Policial[]>(this.api, { params });
    }

    cadastrarPolicial(policial: Policial): Observable<any> {
        return this.http.post(this.api, policial);
    }

    atualizarPolicial(id: number, policial: Policial): Observable<any> {
    // Envia apenas os campos que podem ser atualizados
    const dadosParaAtualizar = {
        rg_civil: policial.rg_civil,
        rg_militar: policial.rg_militar,
        cpf_input: policial.cpf,
        data_nascimento: policial.data_nascimento
    };
    return this.http.put(`${this.api}/${id}`, dadosParaAtualizar);
}

    deletarPolicial(id: number): Observable<any> {
        return this.http.delete(`${this.api}/${id}`);
    }
}