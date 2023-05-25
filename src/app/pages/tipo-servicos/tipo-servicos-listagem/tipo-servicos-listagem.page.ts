import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';
import { TipoServico } from 'src/app/models/tipo-servico.model';
import { TipoServicosService } from 'src/app/services/tipos-services.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tipo-servicos-listagem',
  templateUrl: './tipo-servicos-listagem.page.html',
  styleUrls: ['./tipo-servicos-listagem.page.scss'],
})
export class TipoServicosListagemPage implements OnInit {
  @ViewChild('slidingList') slidingList!: IonList;

  constructor(
    private tipoServicoService: TipoServicosService, 
    private toastService: ToastService
  ) { }

  public tiposServicos!: any;

  ngOnInit() {
    this.tiposServicos = this.tipoServicoService.getAll();
  }

  async removerTipoServico(tipoServico: TipoServico){
    this.tipoServicoService.remove(tipoServico);
    this.toastService.presentToast('Tipo de serviço removido', 3000, 'top');
    await this.slidingList.closeSlidingItems()
  }

}
