import { Injectable } from "@angular/core";
import { SQLiteConnection } from "@capacitor-community/sqlite";

@Injectable({
    providedIn: 'root'
})

export class DatabaseService {
    sqliteConnection !: SQLiteConnection;
    plataform!: string;
    native: boolean = false;
    sqlitePlugin: any;
}