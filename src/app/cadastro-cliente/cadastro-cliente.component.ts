import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FinanceiraServiceService } from './../service/financeira.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validarSobrenome } from '../validators/nome-validator';
import { validarCpf } from '../validators/cpf-validator';
import { validarIdade } from '../validators/idade-validator';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    email: new FormControl('', [ Validators.required, Validators.email]),
    nome: new FormControl('', [ Validators.required, validarSobrenome()]),
    cpf: new FormControl('', [ Validators.required, validarCpf() ]),
    renda: new FormControl('', [ Validators.required ]),
    dataNascimento: new FormControl('', [ Validators.required, validarIdade() ]),
    dataCadastro: new FormControl('', [ Validators.required ]),
  });

  maxDate = new Date();
  maxNasc = new Date();
  edicao = false;

  constructor(private service: FinanceiraServiceService,
             @Inject(MAT_DIALOG_DATA) public data: any,
             private formBuilder: FormBuilder,
             private dialog: MatDialogRef<CadastroClienteComponent>){}



  ngOnInit(): void {
    this.maxNasc.setFullYear(this.maxNasc.getFullYear() - 18);
    if (this.data != null) {
      this.edicao = true;
      this.form.controls['cpf'].disable();
      this.form.patchValue(this.data.cliente)
    }
  }

  getErroEmail() {
    if (this.form.controls['email'].hasError('required')) {
      return 'Campo Obrigatório';
    }

    return this.form.controls['email'].hasError('email') ? 'Digite um e-mail válido' : '';
  }

  getErroNome() {
    if (this.form.controls['nome'].hasError('sobrenome')) {
      return 'Digite o nome completo';
    }

    return this.form.controls['nome'].hasError('required') ? 'Campo Obrigatório' : '';
  }


  getErroCpf() {
    if (this.form.controls['cpf'].hasError('cpfInvalido')) {
      return 'Digite um cpf válido';
    }

    return this.form.controls['cpf'].hasError('required') ? 'Campo Obrigatório' : '';
  }


  fecharDialog() {
    this.dialog.close(false);
  }

  getErroData(controle: string) {
    if (this.form.controls[controle].hasError('matDatepickerParse')) {
      return 'Digite uma data válida';
    }

    if (this.form.controls[controle].hasError('idadeInvalida')) {
      return 'A idade deve ser entre 18 e 60 anos';
    }

    if (this.form.controls[controle].hasError('matDatepickerMax')) {
      return 'Digite uma data válida';
    }


    return this.form.controls[controle].hasError('required') ? 'Campo Obrigatório' : '';
  }


  salvarCliente() {
    const payload = {
      nome: this.form.controls['nome'].value,
      cpf: this.form.controls['cpf'].value,
      dataCadastro: this.form.controls['dataCadastro'].value,
      renda: this.form.controls['renda'].value,
      email: this.form.controls['email'].value,
      dataNascimento: this.form.controls['dataNascimento'].value
    }

    this.service.postCliente(payload).subscribe( () => {
      this.dialog.close(true);
    });
  }

  editarCliente() {
    const payload = {
      id: this.data.cliente.id,
      nome: this.form.controls['nome'].value,
      dataCadastro: this.form.controls['dataCadastro'].value,
      renda: this.form.controls['renda'].value,
      email: this.form.controls['email'].value,
      dataNascimento: this.form.controls['dataNascimento'].value
    }

    this.service.patchCliente(payload).subscribe( () => {
      this.dialog.close(true);
    });
  }
}
