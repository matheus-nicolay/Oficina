import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { OrdemDeServico } from 'src/app/models/ordemdeservico.model';
import { OrdernsDeServicoService } from 'src/app/ordensdeservico.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-ordensdeservico-listagem',
  templateUrl: './ordensdeservico-listagem.page.html',
  styleUrls: ['./ordensdeservico-listagem.page.scss'],
})
export class OrdensdeservicoListagemPage implements OnInit {

  public ordensDeServico: OrdemDeServico[] = [];

  @ViewChild('slidingList') slidingList!: IonList;

  constructor(
    private ordensdeservicoService: OrdernsDeServicoService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const oss = await this.ordensdeservicoService.getAll();
    this.ordensDeServico = oss;
  }

}
