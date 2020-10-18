import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { ClienteFormComponent } from '../../cliente/cliente-form/cliente-form.component';

@Component({
  selector: 'app-servico-form',
  templateUrl: './servico-form.component.html',
  styleUrls: ['./servico-form.component.scss']
})
export class ServicoFormComponent implements OnInit {
  public formGroup: FormGroup;
  public servicos: any = [];
  public isUpdate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private servicoService: ServicoService,
    private dialogRef: MatDialogRef<ClienteFormComponent>

  ) { }

  ngOnInit(): void {
    if (!this.data) {
      this.isUpdate = false;
      this.buildForm({ativo: true});
    } else {
      this.isUpdate = true;
      this.buildForm(this.data.servico);
    }
  }

  buildForm(servico) {
    this.formGroup = this.formBuilder.group({
      id: [servico.id],

      nome: [servico.nome],

      ativo: [servico.ativo],

      descricao: [servico.descricao]
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
      const servico = this.formGroup.value;

      await this.servicoService.create(servico);

      this.closeModal();
    } catch (error) {
      alert("olha o erro!")
    }
  }

  async update() {
    try {
      const servico = this.formGroup.value;

      await this.servicoService.update(servico);

      this.closeModal();
    } catch(error) {
      alert("olha o erro minha filha")
    }
  }

  public closeModal() {
    this.dialogRef.close();
  }
}
