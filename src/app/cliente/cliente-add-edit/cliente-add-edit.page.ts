import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-add-edit',
  templateUrl: './cliente-add-edit.page.html',
  styleUrls: ['./cliente-add-edit.page.scss'],
})
export class ClienteAddEditPage implements OnInit {

  //@ViewChild('inputNome', { read: ElementRef }) nome!: ElementRef; 

  cliente = {nascimento: null, telefone: null, renda: null, email: null, nome: null}

  clienteForm!: FormGroup

  constructor(private formBuilder: FormBuilder) { }

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

  submit() {
    if (this.clienteForm.invalid || this.clienteForm.pending){
      return ;
    }
  }

}
