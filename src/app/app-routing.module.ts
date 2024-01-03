import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './consulta-cliente/consulta-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroClienteComponent
  },
  {
    path: 'lista-clientes',
    component: ConsultaClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
