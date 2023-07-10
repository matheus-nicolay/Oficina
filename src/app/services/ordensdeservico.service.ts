import { Injectable } from "@angular/core";
import { collection, Firestore, getDocs, orderBy, query } from "firebase/firestore";
import { OrdemDeServico, ordemDeServicoConverter } from "../models/ordemdeservico.model";
import { DatabaseService } from "./database.service";
import { databaseName } from "./database.statements";
import { Guid } from "guid-typescript";

@Injectable({
    providedIn: 'root'
})

export class OrdensDeServicoService {

    constructor(
        private databaseService: DatabaseService,
        private _firestore: Firestore
    ) { }

    public async getAll(): Promise<OrdemDeServico[]>{
        const ordensDeServico: OrdemDeServico[] = [];
        const q = query(collection(this._firestore, "ordensdeservico"), orderBy("dataehoraentrada", "desc")).withConverter(ordemDeServicoConverter);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            ordensDeServico.push(doc.data());
        });

        return ordensDeServico;
    }

    async getById(clienteId: string): Promise<OrdemDeServico> {
        const q = doc(this._firestore, "ordensdeservico", clienteId).withConverter(ordemDeServicoConverter);
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.data();
        if(querySnapshot.exists() && data){
            return data;
        } else {
            throw new Error(`Òrdem de Serviço com ID ${clienteId} não encontrada.`);
        }
    }

    async update(ordemDeServico: OrdemDeServico) {
        ordemDeServico.dataehoraentrada = new Date(ordemDeServico.dataehoraentrada);
        const clientesRef = collection(this._firestore, "ordensdeservico");

        if (ordemDeServico.ordemdeservicoid.length == 0){
            await setDoc(doc(clientesRef).withConverter(ordemDeServicoConverter),ordemDeServico);
        }else{
            await setDoc(doc(this._firestore, "ordensdeservico", ordemDeServico.ordemdeservicoid).withConverter(ordemDeServicoConverter),ordemDeServico);
        }
    }

    async removeById(ordensDeServicoId: string) {
       await deleteDoc(doc(this._firestore, "ordensdeservico", ordensDeServicoId))
    }

}