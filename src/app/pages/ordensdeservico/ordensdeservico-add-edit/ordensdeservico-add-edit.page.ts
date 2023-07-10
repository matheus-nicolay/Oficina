import { Component, OnInit } from '@angular/core';
import { OrdemDeServico } from 'src/app/models/ordemdeservico.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.model';
import { ClientesService } from 'src/app/services/clientes.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdensDeServicoService } from 'src/app/services/ordensdeservico.service';
import { ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';
import { SearchService } from 'src/app/services/search-service';

@Component({
  templateUrl: './ordensdeservico-add-edit.page.html'
})

export class OrdensDeServicoAddEditPage implements OnInit {
  public ordemDeServico!: OrdemDeServico;
  public modoDeEdicao = false;
  public osForm!: FormGroup;
  public clientes:  Cliente[] = [];

  public nomeCliente = 'Pesquise o cliente';
  constructor(
    private formBuilder: FormBuilder,
    private clientesService: ClientesService,
    private datePicker: DatePicker,
    private platform: Platform,
    private route: ActivatedRoute,
    private ordensDeServicoService: OrdensDeServicoService,
    private toastService: ToastService, 
    private alertService: AlertService,
    private router: Router,
    private searchService: SearchService,
  ) {  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && Number(id) !== -1){
      this.ordemDeServico = await this.ordensDeServicoService.getById(id);
      const cliente = await this.clientesService.getById(this.ordemDeServico.clienteid);
      this.nomeCliente = cliente.nome;
    } else {
      this.ordemDeServico = {ordemdeservicoid: '', clienteid: '', veiculo: '', dataehoraentrada: new Date() };
      this.modoDeEdicao = true;
    }
    this.createUpdateFormGroup();
  }

  private registrarServicoClienteSelecionado() {
    this.searchService.getObservable().subscribe((data: Cliente) => {
      this.nomeCliente = data.nome;
      this.osForm.controls['clienteid'].setValue(data.clienteid);
    });
  }

  public unsubscribeServices() {
    this.searchService.getObservable().unsubscribe();
  }

  /* async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    const clientes = await this.clientesService.getAll();
    this.clientes = clientes;
    if(id != null){
      const isIdEmptyGUID = Guid.parse(id).isEmpty();
      const isIdValidGUID = Guid.isGuid(id);
      if (id && !isIdEmptyGUID && isIdValidGUID) {
        this.ordemDeServico = await this.ordensDeServicoService.getById(id);
      } else {
        this.ordemDeServico = {ordemdeservicoid: Guid.createEmpty().toString(),clienteid: Guid.createEmpty().toString(), veiculo: '', dataehoraentrada: new Date()};
        this.modoDeEdicao = true;
      }
      this.osForm = this.formBuilder.group({
        ordemdeservicoid: [this.ordemDeServico.ordemdeservicoid],
        clienteid: [this.ordemDeServico.clienteid, Validators.required],
        veiculo: [this.ordemDeServico.veiculo, Validators.required],
        dataentrada: [{ value: this.ordemDeServico.dataehoraentrada.toLocaleDateString(), disabled: !this.modoDeEdicao }, Validators.required],
        horaentrada: [{ value: this.ordemDeServico.dataehoraentrada.toLocaleTimeString(), disabled: !this.modoDeEdicao }, Validators.required],
        dataehoraentrada: [this.ordemDeServico.dataehoraentrada]
      });
      this.ordemDeServico = this.osForm.value;
    }
  } */

/*  async ionViewWillEnter() {
    const clientes = await this.clientesService.getAll();
    this.clientes = clientes;
    this.ordemDeServico = {
      ordemdeservicoid: Guid.createEmpty().toString(),
      clienteid: Guid.createEmpty().toString(),
      veiculo: '',
      dataehoraentrada: new Date()
    };
    this.modoDeEdicao = true;
    this.osForm = this.formBuilder.group({
      ordemdeservicoid: [this.ordemDeServico.ordemdeservicoid],
      clienteid: [this.ordemDeServico.clienteid, Validators.required],
      veiculo: [this.ordemDeServico.veiculo, Validators.required],
      dataentrada: [{ value: this.ordemDeServico.dataehoraentrada.toLocaleDateString(), disabled: !this.modoDeEdicao }, Validators.required],
      horaentrada: [{ value: this.ordemDeServico.dataehoraentrada.toLocaleTimeString(), disabled: !this.modoDeEdicao }, Validators.required],
      dataehoraentrada: [this.ordemDeServico.dataehoraentrada]
    });
  }*/
  selecionarDataEntrada() {
    if (!this.modoDeEdicao) {
      return;
    }
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        this.datePicker.show({
          date: new Date(),
          mode: 'date',
          locale: 'pt-br',
          doneButtonLabel: 'Confirmar',
          cancelButtonLabel: 'Cancelar'
        }
        ).then(
          data => {
            this.osForm.controls['dataentrada'].setValue(data.toLocaleDateString());
            this.osForm.controls['horaentrada'].setValue('');
          }
        );
      } else {
        // instruções para execução no navegador
      }
    });
  }
  
  selecionarHoraEntrada() {
    if (!this.modoDeEdicao) {
      return;
    }
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        this.datePicker.show({
          date: new Date(),
          mode: 'time',
          locale: 'pt-br',
          doneButtonLabel: 'Confirmar',
          cancelButtonLabel: 'Cancelar'
        })
        .then(
          data => {
            const dataEHoraEntrada = new Date(this.osForm.controls['dataehoraentrada'].value)
            dataEHoraEntrada.setHours(data.getHours());
            dataEHoraEntrada.setMinutes(data.getMinutes());
            this.osForm.controls['horaentrada'].setValue(data.toLocaleTimeString());
            this.osForm.controls['dataehoraentrada'].setValue(dataEHoraEntrada.toISOString());
          }
        );
      } else {
        // instruções para execução no navegador
      }
    });
  }


  // Método a ser invocado quando o botão de alterar dados for selecionado
  iniciarEdicao() {
    this.modoDeEdicao = true;
  }

  // Método a ser invocado quando o botão de cancelar alteração for selecionado
  cancelarEdicao() {
    this.createUpdateFormGroup();
    this.modoDeEdicao = false;
  }
  
  // Método a ser invocado quando o botão de gravar for selecionado
  async submit() {
    if (this.osForm.invalid || this.osForm.pending) {
        await this.alertService.presentAlert('Falha', 'Gravação não foi executada', 'Verifique os dados informados para o atendimento', ['Ok']);
        return;
    }
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const data = new Date(this.osForm.controls['dataentrada'].value).toISOString();
    const hora = new Date(this.osForm.controls['dataentrada'].value).toISOString();
    this.osForm.controls['dataehoraentrada'].setValue(
        data.substring(0, 11) + this.osForm.controls['horaentrada'].value
    );
    await this.ordensDeServicoService.update(this.osForm.value);
    loading.dismiss().then(() => {
        this.toastService.presentToast('Gravação bem sucedida', 3000, 'top');
        this.router.navigateByUrl('ordensdeservico-listagem');
    })
  }

  private createUpdateFormGroup() {
    this.osForm = this.formBuilder.group({
      ordemdeservicoid: [this.ordemDeServico.ordemdeservicoid],
      clienteid: [this.ordemDeServico.clienteid, Validators.required],
      veiculo: [this.ordemDeServico.veiculo, Validators.required],
      dataentrada: [this.ordemDeServico.dataehoraentrada.toISOString(), Validators.required],
      horaentrada: [this.ordemDeServico.dataehoraentrada.toLocaleTimeString('pt-BR'), Validators.required],
      dataehoraentrada: ['']
    });
  }
}