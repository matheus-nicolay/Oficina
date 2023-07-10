import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { OrdemDeServico } from 'src/app/models/ordemdeservico.model';
import { AlertService } from 'src/app/services/alert.service';
import { OrdensDeServicoService } from 'src/app/services/ordensdeservico.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-ordensdeservico-listagem',
  templateUrl: './ordensdeservico-listagem.page.html',
  styleUrls: ['./ordensdeservico-listagem.page.scss'],
})

export class OrdensdeservicoListagemPage implements OnInit {

  public ordensDeServico: OrdemDeServico[] = [];
  //public ordensDeServico: void | OrdemDeServico[] = [];
  
  @ViewChild('slidingList') slidingList!: IonList;
  
  constructor(
    private ordensdeservicoService: OrdensDeServicoService,
    private toastService: ToastService,
    private alertService: AlertService
    ) { }
  
  ngOnInit() {
  }
    
  async ionViewWillEnter() {
    this.ordensDeServico = await this.ordensdeservicoService.getAll();
  }


  async removerAtendimento(ordemDeServico: OrdemDeServico) {
    try {
      const successFunction = async () => {
        await this.ordensdeservicoService.removeById(ordemDeServico.ordemdeservicoid);
        this.toastService.presentToast('Atendimento removido com sucesso', 3000, 'top');
        this.slidingList.closeSlidingItems();
        this.ordensDeServico = await this.ordensdeservicoService.getAll();
      };
      await this.alertService.presentConfirm('Remover Atendimento', 'Confirma remoção?', successFunction);
    } catch (e: any) {
      await this.alertService.presentAlert('Falha', 'Remoção não foi executada', e, ['Ok'])
    }
  }
}