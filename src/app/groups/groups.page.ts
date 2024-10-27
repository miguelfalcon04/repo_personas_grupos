import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../core/models/person.model';
import { Paginated } from '../core/models/paginated.model';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
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

  constructor(private groupSv:GroupService) { }

  ngOnInit():void {
    this.getMoreGroups();
  }

  page:number = 1;
  pageSize:number = 25;

  getMoreGroups(notify:HTMLIonInfiniteScrollElement | null = null){
    this.groupSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Group>)=>{
        this._group.next([...this._group.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }

}
