import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private initPlugin!: boolean;

  async initializeApp(){
    this.platform.ready().then(async () => {
      this.databaseService.initializePlugin().then(async (ret) => {
        try {
          const db = await this.databaseService.createConnection("oficina", false, "no-encryption", 1);
        } catch (err) {
          console.log(`Error: ${err}`);
          this.initPlugin = false;
        }
        console.log('Status da inicialização do plugin: ' + this.initPlugin);
      });
    });
  }

  constructor(
    private storage: Storage,
    private platform: Platform,
    private databaseService: DatabaseService,
  ) {
    this.initializeApp()
  }

  async ngOnInit() {
    await this.storage.create();
  }
}
