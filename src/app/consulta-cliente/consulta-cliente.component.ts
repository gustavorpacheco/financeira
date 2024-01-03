import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FinanceiraServiceService } from '../service/financeira.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CadastroClienteComponent } from '../cadastro-cliente/cadastro-cliente.component';
import { SucessoDialogComponent } from '../sucesso-dialog/sucesso-dialog.component';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.scss']
})
export class ConsultaClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource();
  displayedColumns = [ 'nome', 'cpf', 'dataCadastro', 'renda', 'icon'];

  constructor(private service: FinanceiraServiceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getClientes();
  }

  abrirDialogSucesso(acao: string) {
    this.dialog.open(SucessoDialogComponent, {
      height: '300px',
      width: '400px',
      panelClass: 'border-dialog',
      data: { acao }})
  }

  getClientes() {
    this.service.getClientes().subscribe( (res: any) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(cliente: any) {
    this.dialog.open(CadastroClienteComponent, {
      height: '50%',
      width: '50%',
      panelClass: 'border-dialog',
      data: {
        cliente
      }
    }).afterClosed().subscribe( (res: boolean) => {
      if (res) {
        this.getClientes();
        this.abrirDialogSucesso('editado');
      }
    })
  }

  abrirDialog() {
    this.dialog.open(CadastroClienteComponent, {
      height: '50%',
      width: '50%',
      panelClass: 'border-dialog',
    }).afterClosed().subscribe( (res: boolean) => {
      if (res) {
        this.getClientes();
        this.abrirDialogSucesso('cadastrado');
      }
    })
  }

  deletar(cliente: any) {
    this.service.deleteCliente(cliente.id).subscribe( () => {
      this.getClientes();
      this.abrirDialogSucesso('deletado');
    });
  }
}
