import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Person } from '../core/models/person.model';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Paginated } from '../core/models/paginated.model';
import { PeopleService } from '../core/services/impl/people.service';
import { PersonModalComponent } from '../components/person-modal/person-modal.component';
import { GroupService } from '../core/services/impl/group.service';

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
    private groupsSv: GroupService,
    private modalCtrl:ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit():void {
    this.getMorePeople();
  }

  selectedPerson: any = null;
  page:number = 1;
  pageSize:number = 25;
  totalPages!: number;

  refresh(){
    this.peopleSv.getAll(1, (this.page - 1) * this.pageSize).subscribe({
      next:(response:Paginated<Person>)=>{
        this.totalPages = response.pages;
        this._people.next(response.data);
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

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    this.getMorePeople(ev.target);
  }

  async onUpdatePerson(person: any, index: number){
    const modal = await this.modalCtrl.create({
      component: PersonModalComponent,
      componentProps: {
        mode: "edit",
        person: person,
        groups: await lastValueFrom(this.groupsSv.getAllElements()),
      }
    })

    modal.onDidDismiss().then((data:any)=>{
      this.peopleSv.update(person!.id, data.data).subscribe({
        next:(response: Person) => {
          this.refresh();
        }
      })
    })

    await modal.present();
  }

  async onAddPerson(){
    const modal = await this.modalCtrl.create({
      component:PersonModalComponent,
      componentProps:{
        groups: await lastValueFrom(this.groupsSv.getAllElements()),
      }
    });

    modal.onDidDismiss().then((data)=>{
      let person:Person = {
        id: '',
        name: data.data.name,
        surname: data.data.surname,
        age: data.data.age,
        email: data.data.email,
        gender: data.data.gender,
        group_id: data.data.group_id
      }
      this.peopleSv.add(person).subscribe({
        next:(response: Person) => {
          this.refresh();
        }
      });
    });

    return await modal.present();
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
