import { Injectable } from '@angular/core';
import { keycloak } from './keycloak.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    return keycloak.authenticated ?? false;
  }

  login(): void {
    keycloak.login();
  }

  logout(): void {
    keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  getUsername(): string {
    return keycloak.tokenParsed?.['preferred_username'] ?? 'Inconnu';
  }

  getEmail(): string {
    return keycloak.tokenParsed?.['email'] ?? '';
  }

  hasRole(role: string): boolean {
    return keycloak.hasRealmRole(role);
  }

  getToken(): string {
    return keycloak.token ?? '';
  }
}