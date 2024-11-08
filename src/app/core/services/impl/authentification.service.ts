import { Injectable } from "@angular/core";
import { IAuthentication } from "../interfaces/authentication.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService<S,R> implements IAuthentication<S,R>{

  // TODO abstract signIn(authPlayLoad: StrapiSignIn): Observable<XXX>
}
