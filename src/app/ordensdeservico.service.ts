import { Injectable } from "@angular/core";
import { DatabaseService } from "./database.service";
import { OrdemDeServico } from "./models/ordemdeservico.model";

@Injectable({
    providedIn: 'root'
})

export class OrdernsDeServicoService{
    constructor(
        private databaseService: DatabaseService
    ) { }

    public async getAll(){
        const db = await this.databaseService.sqliteConnection.retrieveConnection("oficina", false);
        db.open();

        let returnQuery = await db.query("SELECT * FROM ordensdeservico;");
        let ordensdeservico: OrdemDeServico[] = [];
        if (returnQuery.values!.length > 0){
            for (let i=0; i < returnQuery.values!.length; i++){
                const ordemdeservico = returnQuery.values![i];
                console.log(`OS> ${ordemdeservico}`);
                ordensdeservico.push(ordemdeservico)
            }
        }
        return ordensdeservico;
    }
}