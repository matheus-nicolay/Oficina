import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-add-edit',
  templateUrl: './cliente-add-edit.page.html',
  styleUrls: ['./cliente-add-edit.page.scss'],
})
export class ClienteAddEditPage implements OnInit {

  //@ViewChild('inputNome', { read: ElementRef }) nome!: ElementRef; 

  cliente = {nascimento: null, telefone: null, renda: null, email: null, nome: null}

  clienteForm!: FormGroup

  hasErrors = false;
  errorMessage: string[] | undefined;

  validationMessages = {
    nome: [
      {type: 'required', message: 'Nome é obrigatório'},
      {type: 'minlength', message: 'Nome deve ter ao menos 3 caracteres'},
      {type: 'maxlength', message: 'Nome não pode ter mais que 50 caracteres'}
    ],
    email: [
      {type: 'required', message: 'E-mail é obrigatório'},
    ],
    telefone: [
      {type: 'required', message: 'Telefone é obrigatório'},
    ],
    nascimento: [
      {type: 'required', message: 'Nascimento é obrigatório'},
    ],
    renda: [
      { type: 'min', message: 'Renda precisa ser positiva' },
      { type: 'required', message: 'Renda é obrigatório' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private toastCtrl: ToastController
    ) { 
  }

  async presentAlert(header: string, subHeader: string, message: string, buttons: string[]) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons
    });
    await alert.present();
  }

  async presentToast(message: string, duration: number, position: 'top' | 'bottom') {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position
    });
    toast.present();
  }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      telefone: ['', Validators.required],
      renda: ['0', Validators.compose([Validators.required, Validators.min(0)])],
      nascimento: ['', Validators.required],
    });
  }

  public nome: string | undefined;
  public email: string | undefined;
  public telefone: string | undefined;
  public renda: string | undefined;
  public nascimento: string | undefined;

  async submit() {

    this.errorMessage = [];

    if(this.clienteForm.get('nome')!.hasError('required') || this.clienteForm.get('nome')!.hasError('minLength')) {
      this.errorMessage.push('Nome é obrigatório');
    }

    if(this.clienteForm.get('email')!.hasError('required') || this.clienteForm.get('nome')!.hasError('minLength')){
      this.errorMessage.push('Email é obrigatório');
    }

    if(this.clienteForm.get('telefone')!.hasError('required')){
      this.errorMessage.push('Telefone é obrigatório');
    }
    if(this.clienteForm.get('renda')!.hasError('required')){
      this.errorMessage.push('Renda é obrigatório');
    }
    if(this.clienteForm.get('nascimento')!.hasError('required')){
      this.errorMessage.push('Nascimento é obrigatório');
    }

    this.hasErrors = this.errorMessage.length > 0;

    if (!this.hasErrors){
      await this.presentAlert('Sucesso', 'Gravação bem sucedida', 'Os dados do cliente foram gravados', ['Ok']);
    }

    if (!this.hasErrors){
      await this.presentToast('Gravacao bem sucedida', 3000, 'top');
    }
  }

}
