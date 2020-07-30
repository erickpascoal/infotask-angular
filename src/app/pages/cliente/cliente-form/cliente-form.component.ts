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
      this.buildForm({ativo: true});
    } else {
      this.isUpdate = true;
      this.buildForm(this.data.cliente);
    }
  }

  buildForm(cliente) {
    this.formGroup = this.formBuilder.group({
      id: [cliente.id],

      nome: [cliente.nome, Validators.required],

      rg: [cliente.rg],

      cpf: [cliente.cpf, Validators.required],

      cnpj: [cliente.cnpj],

      email: [cliente.email, Validators.email],

      telefone: [cliente.telefone],

      celular: [cliente.celular],

      data_cadastro: [cliente.data_cadastro],

      estado: [cliente.estado],

      cidade: [cliente.cidade],

      bairro: [cliente.bairro],

      endereco: [cliente.endereco],

      endereco_numero: [cliente.endereco_numero],

      cep: [cliente.cep],

      ativo: [cliente.ativo],
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
