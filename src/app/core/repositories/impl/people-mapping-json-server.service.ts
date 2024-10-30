import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Person } from "../../models/person.model";

export interface PersonRaw {
    id?: string
    nombre: string
    apellidos: string
    edad?:string
    email: string
    genero: string
    grupoId: string
}
@Injectable({
    providedIn: 'root'
  })
  export class PeopleMappingJsonServer implements IBaseMapping<Person> {

    constructor() { }

    toGenderMapping:any = {
      Masculino:'male',
      Femenino:'female',
      Otros:'other'
  };

  fromGenderMapping:any = {
      male:'Masculino',
      female:'Femenino',
      other:'Otros'
  };


    setAdd(data: Person):PersonRaw{
      return {
        nombre:data.name,
        apellidos:data.surname,
        email:data.email??'',
        edad:data.age?.toString()??'',
        genero: this.toGenderMapping[data.gender],
        grupoId:data.group_id??''
    };
    }
    setUpdate(data: Person): PersonRaw {
      let toReturn:any = {};
      Object.keys(data).forEach(key =>{
        switch(key){
          case 'name': toReturn['nombre']=data[key];
                break;
                case 'surname': toReturn['apellidos']=data[key];
                break;
                case 'age': toReturn['edad']=data[key];
                break;
                case 'email': toReturn['email']=data[key];
                break;
                case 'gender': toReturn['genero']=data[key]=='Masculino'?'male':data[key]=='Femenino'?'female':'other';
                break;
                case 'group_id': toReturn['grupoId']=data[key];
                break;
                default:
        }
      });
      return toReturn;
    }

    getAll(data: PersonRaw[]): Person[] {
      return data.map<Person>((d: PersonRaw) => this.getOne(d))
    }

    getPaginated(page:number, pageSize: number, pages:number, data:PersonRaw[]): Paginated<Person> {
        return {page:page, pageSize:pageSize, pages:pages, data:data.map<Person>((d:PersonRaw)=>{
            return this.getOne(d);
        })};
    }
    getOne(data: PersonRaw):Person {
        return {
            id:data.id!,
            name:data.nombre,
            surname:data.apellidos,
            age:(data as any)["edad"]??0,
            email:(data as any)["email"]??'',
            group_id:(data as any)["grupoId"]??'',
            gender:this.fromGenderMapping[data.genero],
            picture:(data as any)["picture"]?{
                large:(data as any)["picture"].large,
                thumbnail:(data as any)["picture"].thumbnail
            }:undefined};
    }
    getAdded(data: any):Person {
      return this.getOne(data)
    }
    getUpdated(data: any):Person {
      return this.getOne(data)
    }
    getDeleted(data: any):Person {
      return this.getOne(data)
    }
  }
