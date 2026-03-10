import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { keycloak } from './app/core/keycloak.config';

keycloak.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  pkceMethod: 'S256'
})
.then(() => {
  // 2. Keycloak est prêt → on démarre Angular
  bootstrapApplication(App, appConfig)
    .catch(err => console.error(err));
})
.catch(() => {
  console.error('Keycloak introuvable — vérifie qu\'il est bien démarré');
});