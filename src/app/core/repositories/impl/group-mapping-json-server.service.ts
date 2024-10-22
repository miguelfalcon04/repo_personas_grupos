import { Injectable } from "@angular/core";
import { IBaseMapping } from "../intefaces/base-mapping.interface";
import { Paginated } from "../../models/paginated.model";
import { Group } from "../../models/group.model";

export interface GroupRaw{
  id:string,
  nombre:string
}

@Injectable({
  providedIn:'root'
})
export class GroupMappingJsonServer implements IBaseMapping<Group>{

  getPaginated(page:number, pageSize:number, pages:number, data: GroupRaw[]): Paginated<Group> {
    return {page:page, pageSize:pageSize, pages:pages, data:data.map<Group>((d:GroupRaw)=>{
        return this.getOne(d);
    })};
}

  getOne(data: any): Group {
    return{
      id:data.id,
      name:data.nombre
    }
  }

  getAdded(data: any): Group {
    throw new Error("Method not implemented.");
  }
  getUpdated(data: any): Group {
    throw new Error("Method not implemented.");
  }
  getDeleted(data: any): Group {
    throw new Error("Method not implemented.");
  }

}

