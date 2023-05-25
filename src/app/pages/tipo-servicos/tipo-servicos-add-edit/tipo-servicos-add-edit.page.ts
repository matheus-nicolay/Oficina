import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoServico } from 'src/app/models/tipo-servico.model';
import { TipoServicosService } from 'src/app/services/tipos-services.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tipo-servicos-add-edit',
  templateUrl: './tipo-servicos-add-edit.page.html',
  styleUrls: ['./tipo-servicos-add-edit.page.scss'],
})
export class TipoServicosAddEditPage implements OnInit {
  public tiposServicosForm!: FormGroup

  private tipoServico!: TipoServico;

  public modoDeEdicao = false;

  submit () {
    this.tipoServicoService.update(this.tiposServicosForm.value);
    this.toastService.presentToast('Gravação bem sucedida', 3000, 'top');
    this.router.navigateByUrl('');
    this.modoDeEdicao = false;
  }

  cancelarEdicao () {
    this.tiposServicosForm.setValue(this.tipoServico);
    this.modoDeEdicao = false;
  }

  constructor(
    private route: ActivatedRoute,
    private tipoServicoService: TipoServicosService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) { }

  iniciarEdicao() {
    this.modoDeEdicao = true;
  }

  ngOnInit() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    if (id > 0) {
      this.tipoServico = this.tipoServicoService.getById(id);
    } else {
      this.tipoServico = {id, nome: '', valor: 0.00};
      this.modoDeEdicao = true;
    }
    this.tiposServicosForm = this.formBuilder.group({
      id: [this.tipoServico.id],
      nome: [this.tipoServico.nome, Validators.required],
      valor: [this.tipoServico.valor, Validators.required]
    })
  }

}
