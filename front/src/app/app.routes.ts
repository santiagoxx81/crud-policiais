import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [
    {path: '', component: CadastroComponent},
    {path: 'policiais', component: CadastroComponent}
];
