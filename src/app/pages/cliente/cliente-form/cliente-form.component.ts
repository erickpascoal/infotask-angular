import { ClienteService } from './../cliente.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  public formGroup: FormGroup;
  public isUpdate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ClienteFormComponent>,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    if (!this.data) {
      this.isUpdate = false;
      this.buildForm({cliente_ativo: true});
    } else {
      this.isUpdate = true;
      this.buildForm(this.data.cliente);
    }
  }

  buildForm(cliente) {
    this.formGroup = this.formBuilder.group({
      id: [cliente.id],

      nome: [cliente.nome,
      Validators.compose(
        [
          Validators.required
        ])],

      rg: [cliente.rg,
      Validators.compose([
      ])],

      cpf: [cliente.cpf,
      Validators.compose(
        [
          Validators.required
        ])],

      cnpj: [cliente.cnpj,
      Validators.compose(
        [])],

      email: [cliente.email,
      Validators.compose(
        [Validators.email])],

      telefone: [cliente.telefone,
      Validators.compose(
        [])],

      celular: [cliente.celular,
      Validators.compose(
        [])],

      data_cadastro: [cliente.data_cadastro,
      Validators.compose(
        [])],

      estado: [cliente.estado,
      Validators.compose(
        [])],

      cidade: [cliente.cidade,
      Validators.compose(
        [])],

      bairro: [cliente.bairro,
      Validators.compose(
        [])],

      endereco: [cliente.endereco,
      Validators.compose(
        [])],

      endereco_numero: [cliente.endereco_numero,
      Validators.compose(
        [])],

      cep: [cliente.cep,
      Validators.compose(
        [])],

      cliente_ativo: [cliente.cliente_ativo,
        Validators.compose(
        [])],
    })
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
      const cliente = this.formGroup.value;

      await this.clienteService.create(cliente);

      console.log(cliente);

      this.closeModal();
    } catch (error) {
      alert("deu erro")
    }
  }

  async update() {
    try {
      const cliente = this.formGroup.value;

      await this.clienteService.update(cliente);

      this.closeModal();
    } catch (error) {
      alert("deu erro")
    }
  }

  public closeModal() {
    this.dialogRef.close();
  }
}
