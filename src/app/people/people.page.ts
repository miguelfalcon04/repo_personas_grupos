import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Person } from '../core/models/person.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from '../core/models/paginated.model';
import { PeopleService } from '../core/services/impl/people.service';
import { PersonModalComponent } from '../components/person-modal/person-modal.component';
import { Group } from '../core/models/group.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  _people:BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([])
  people$:Observable<Person[]> = this._people.asObservable();

  constructor(
    private peopleSv:PeopleService,
    private modalCtrl:ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit():void {
    this.getMorePeople();
  }

  selectedPerson: any = null;
  page:number = 1;
  pageSize:number = 25;

  refresh(){
    this.page=1;
    this.peopleSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Person>)=>{
        this._people.next([...response.data]);
        this.page++;
      }
    });
  }

  getMorePeople(notify:HTMLIonInfiniteScrollElement | null = null){
    this.peopleSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Person>)=>{
        this._people.next([...this._people.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }

  async openPersonDetail(person: any, index: number){
    const modal = await this.modalCtrl.create({
      component:PersonModalComponent,
      componentProps:{

      }
    });
    modal.onDidDismiss().then((res:any)=>{
      console.log(res);
    });

    await modal.present();
  }


  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getMorePeople(ev.target);
  }

  async onAddPerson(){
    const modal = await this.modalCtrl.create({
      component:PersonModalComponent,
      componentProps:{

      }
    });
    modal.onDidDismiss().then((res:any)=>{
      console.log(res);
    });

    await modal.present();
  }

  async onDeletePerson(person:Person){
    const alert = await this.alertController.create({
      header: "Eliminar persona",
      message: "¿Está seguro de que desea eliminar a esa persona?",
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
            this.peopleSv.delete(person.id).subscribe({
              next:(deletedPerson) => {
                console.log(`Persona eliminada: ${deletedPerson.name} ${deletedPerson.surname}`);
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
