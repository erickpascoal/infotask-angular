import { OrdemServicoService } from './../ordem-servico.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../cliente/cliente.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-ordem-servico-form',
  templateUrl: './ordem-servico-form.component.html',
  styleUrls: ['./ordem-servico-form.component.scss']
})
export class OrdemServicoFormComponent implements OnInit {
  public formGroup: FormGroup;
  clientes: any = [];
  clientesFiltrados: Observable<any[]>;
  isUpdate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<OrdemServicoFormComponent>,
    private formBuilder: FormBuilder,
    private ordemServicoService: OrdemServicoService,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.loadClientes();

    if (!this.data) {
      this.isUpdate = false;
      this.buildForm({});
    } else {
      this.isUpdate = true;
      this.buildForm(this.data.ordemServico);
    }

    this.ativaAutoCompleteCliente();
  }

  ativaAutoCompleteCliente() {
    this.clientesFiltrados = this.formGroup.controls['cliente_nome'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    this.validaCliente(value);
    const filterValue = value ? value.toString().toLowerCase() : '';
    return this.clientes.filter(c => c.nome.toLowerCase().indexOf(filterValue) === 0);
  }

  validaCliente(value) {
    if (this.clientes.findIndex(c => c.nome == value) > -1) {
    } else {
      this.formGroup.controls['cliente_nome'].setErrors({ clienteNaoExistente: true });
    }
  }

  buildForm(ordemServico) {
    this.formGroup = this.formBuilder.group({
      id: [ordemServico.id],

      numero: [ordemServico.numero,
      Validators.compose(
        [
        ])],

      cliente_nome: [ordemServico.cliente_nome,
      Validators.compose(
        [
        ])],

      modelo: [ordemServico.modelo,
      Validators.compose(
        [
        ])],

      status: [ordemServico.status,
      Validators.compose([
        Validators.required
      ])],

      problema_reclamado: [ordemServico.problema_reclamado,
      Validators.compose(
        [
        ])],

      observacao: [ordemServico.observacao,
      Validators.compose(
        [])],

      defeito_encontrado: [ordemServico.defeito_encontrado,
      Validators.compose(
        [])],

      valor: [ordemServico.valor,
      Validators.compose(
        [])],

      observacao_tecnico: [ordemServico.observacao_tecnico,
      Validators.compose(
        [])],

      data_saida: [ordemServico.data_saida,
      Validators.compose(
        [])],
    })

    this.bloqueiaCampos();
  }

  bloqueiaCampos() {
    if (this.isUpdate) {
      this.formGroup.controls['cliente_nome'].disable();
    }
  }

  submit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      if (!this.isUpdate) {
        this.create();
      } else {
        this.update();
      }
    }
  }

  async create() {
    try {
      const cliente = this.clientes.find(c => c.nome == this.formGroup.value.cliente_nome);
      const ordemServico = this.formGroup.value;
      ordemServico.cliente_id = cliente.id;
      ordemServico.cliente_nome = cliente.nome;
      ordemServico.cliente_cpf = cliente.cpf;
      console.log(ordemServico);

      await this.ordemServicoService.create(ordemServico);

      this.closeModal();
    } catch (error) {
      alert("deu erro")
    }
  }

  async update() {
    try {

      await this.ordemServicoService.update(this.formGroup.value);

      this.closeModal();
    } catch (error) {
      alert("deu erro")
    }
  }

  public closeModal() {
    this.dialogRef.close();
  }

  async loadClientes() {
    const response: any = await this.clienteService.findAllAtivos();

    this.clientes = response.data;
  }
}
