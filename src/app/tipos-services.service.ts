import { Injectable } from '@angular/core';
import { TipoServico } from './models/tipo-servico.model';

@Injectable({
  providedIn: 'root'
})
export class TipoServicosService {
  private tiposServicos: TipoServico[] = [
    { id: 1, nome: 'Alinhamento', valor: 12.34 },
    { id: 2, nome: 'Balanceamento', valor: 56.78 },
    { id: 3, nome: 'Revisão freios', valor: 90.12 },
    { id: 4, nome: 'Suspensão', valor: 34.56 },
  ];
  
  getById(id: number): TipoServico

  getAll(): TipoServico[]

  update(tipoServico: TipoServico)

  private getIndexOfElement(id: number): number {
    return this.tiposServicos.indexOf(this.getById(id));
  }

  update(tipoServico: TipoServico) {
    if(tipoServico.id < 0) {
      tipoServico.id = this.tiposServicos[this.tiposServicos.length - 1].id + 1;
      this.tiposServicos.push(tipoServico);
    } else {
      this.tiposServicos[this.getIndexOfElement(tipoServico.id)] = tipoServico;
    }

  }

  getAll() {
    return this.tiposServicos;
  }

  constructor() { }

  getById(id: number) {
    const tipoServicoSelecionado = this.tiposServicos.filter(
      tipoServico => tipoServico.id === id
    );
    return tipoServicoSelecionado[0];
  }
}
