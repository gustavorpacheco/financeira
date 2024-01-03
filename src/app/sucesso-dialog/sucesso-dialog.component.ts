import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso-dialog.component.html',
  styleUrls: ['./sucesso-dialog.component.scss']
})
export class SucessoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
             private dialog: MatDialogRef<SucessoDialogComponent>){}


  acao = '';

  ngOnInit(): void {
    this.acao = this.data.acao;
  }

  fecharDialog() {
    this.dialog.close(false);
  }

}
