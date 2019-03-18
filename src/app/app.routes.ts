import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { PagesComponent } from './pages/pages.component';

 import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';

 const appRoutes: Routes = [

    { path: 'login', component: LoginComponent  },
    { path: 'register', component: RegisterComponent  },
    {
       path: '',
       component: PagesComponent,
       canActivate: [ LoginGuardGuard ],
       loadChildren: './pages/pages.module#PagesModule#PagesModule'
    },
    { path: '**', component: NopagefoundComponent  }
 ];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
