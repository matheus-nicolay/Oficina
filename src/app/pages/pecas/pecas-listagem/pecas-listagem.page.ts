import { Component, OnInit, ViewChild } from '@angular/core';
import { PecasService } from 'src/app/pecas.service';
import { Peca } from 'src/app/models/peca.model';
import { ToastService } from 'src/app/toast.service';
import { IonList } from '@ionic/angular';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-pecas-listagem',
  templateUrl: './pecas-listagem.page.html',
  styleUrls: ['./pecas-listagem.page.scss'],
})
export class PecasListagemPage implements OnInit {
  public pecas: any;

  @ViewChild('slidingList') slidingList!: IonList;

  async removerPeca(peca: Peca) {
    await this.pecasService.removeById(this.idAsString(peca.id));
    this.pecas = await this.pecasService.getAll();
    this.toastService.presentToast('Peça removida', 3000, 'top');
    await this.slidingList.closeSlidingItems();
  }

  constructor(
    private pecasService: PecasService,
    private toastService: ToastService
  ) { }

  idAsString(id: Guid): string {
    const convertedId= JSON.parse(JSON.stringify(id));
    return convertedId.value;
  }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.pecasService.getAll().then(pecas => {
      this.pecas = pecas;
    });
  }

}
