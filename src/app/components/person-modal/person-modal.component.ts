import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Person } from 'src/app/core/models/person.model';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent  implements OnInit {

  @Input() person:Person | undefined
  formGroup: any;

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController)
    {
      this.formGroup = this.fb.group({
        name:['',[Validators.required]],
        surname:['',[Validators.required]],
        email:['',[Validators.required, Validators.email]],

        age:['',[Validators.required]]

      })
     }

  ngOnInit() {}

}
