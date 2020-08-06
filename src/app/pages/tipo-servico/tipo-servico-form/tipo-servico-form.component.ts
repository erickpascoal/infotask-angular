import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteFormComponent } from '../../cliente/cliente-form/cliente-form.component';
import { TipoServicoService } from '../tipo-servico.service';

@Component({
  selector: 'app-tipo-servico-form',
  templateUrl: './tipo-servico-form.component.html',
  styleUrls: ['./tipo-servico-form.component.scss']
})
export class TipoServicoFormComponent implements OnInit {
  public formGroup: FormGroup;
  public tiposDeServico: any = [];
  public isUpdate: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ClienteFormComponent>,
    private tipoServicoService: TipoServicoService,
  ) { }

  ngOnInit(): void {
    if (!this.data) {
      this.isUpdate = false;
      this.buildForm({ativo: true});
    } else {
      this.isUpdate = true;
      this.buildForm(this.data.tipoServico);
    }
  }

  buildForm(tipoServico) {
    this.formGroup = this.formBuilder.group({
      id: [tipoServico.id],

      nome: [tipoServico.nome],

      ativo: [tipoServico.ativo],

      descricao: [tipoServico.descricao]
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
      const tipoServico = this.formGroup.value;

      await this.tipoServicoService.create(tipoServico);

      console.log(tipoServico)

      this.closeModal();
    } catch (error) {
      alert("olha o erro!")
      console.log(error)
    }
  }

  async update() {
    try {
      const tipoServico = this.formGroup.value;

      await this.tipoServicoService.update(tipoServico);

      this.closeModal();
    } catch(error) {
      alert("olha o erro minha filha")
    }
  }

  public closeModal() {
    this.dialogRef.close();
  }
}