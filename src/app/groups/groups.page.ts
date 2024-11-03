import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../core/models/person.model';
import { Paginated } from '../core/models/paginated.model';
import { InfiniteScrollCustomEvent, ModalController, AlertController } from '@ionic/angular';
import { Group } from '../core/models/group.model';
import { GroupService } from '../core/services/impl/group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  _group:BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([])
  group$:Observable<Group[]> = this._group.asObservable();

  constructor(
    private groupSv:GroupService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit():void {
    this.getMoreGroups();
  }

  page:number = 1;
  pageSize:number = 25;
  totalPages!: number;

  refresh(){
    this.groupSv.getAll(1, (this.page - 1) * this.pageSize).subscribe({
      next:(response:Paginated<Group>)=>{
        this.totalPages = response.pages;
        this._group.next(response.data);
      }
    });
  }

  getMoreGroups(notify:HTMLIonInfiniteScrollElement | null = null){
    this.groupSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Group>)=>{
        this._group.next([...this._group.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }




  async onAddGroup(){
    this.modalCtrl
  }

  async onDeleteGroup(group:Group){
    const alert = await this.alertController.create({
      header: "Eliminar grupo",
      message: "¿Está seguro de que desea eliminar a este grupo?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminado cancelado');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminado confirmado');
            this.groupSv.delete(group.id).subscribe({
              next:(deletedGroup) => {
                console.log(`Grupo eliminada: ${deletedGroup.name}`);
                this.refresh();
              }
            });
          }
        }
      ]
    });

    await alert.present();

  }

}
