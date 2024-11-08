import { Observable } from "rxjs";
import { AuthenticationService } from "./authentification.service";
import { Inject } from "@angular/core";
import { AUTH_API_URL_TOKEN, AUTH_SIGN_IN_TOKEN, AUTH_SIGN_UP_TOKEN } from "../../repositories/repository.tokens";


/*
export class StrapiAuthenticationService extends AuthenticationService<StrapiSignIn, StrapiSignUp>{

  constructor(
    @Inject(AUTH_API_URL_TOKEN) authUrl: string,
    @Inject(AUTH_SIGN_IN_TOKEN) signIn: string,
    @Inject(AUTH_SIGN_UP_TOKEN) signUp: string,

  ){
    super(authUrl, signIn, signUp )
  }

  override signIn(authPlayLoad: any): Observable<any> {
    throw new Error("Method not implemented.");
  }

}
  */
