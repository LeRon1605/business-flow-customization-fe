import { Routes } from '@angular/router';
import { BasicLayoutComponent, SideBarLayout } from './shared/layouts';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
      path: 'home',
      component: SideBarLayout,
      loadChildren: () => import('./pages/home/home.module').then(x => x.HomeModule),
      canActivate: [ AuthGuard ]
    },
    {
      path: 'auth',
      component: BasicLayoutComponent,
      loadChildren: () => import('./pages/auth/auth.module').then(x => x.AuthModule),
    },
    {
      path: 'tenant',
      component: SideBarLayout,
      loadChildren: () => import('./pages/tenant/tenant.module').then(x => x.TenantModule),
      canActivate: [ AuthGuard ]
    },
    {
      path: 'tenant-invitation',
      component: BasicLayoutComponent,
      loadChildren: () => import('./pages/tenant-invitation/tenant-invitation.module').then(x => x.TenantInvitationModule)
    },
    {
      path: 'space',
      component: SideBarLayout,
      loadChildren: () => import('./pages/space/space.module').then(x => x.SpaceModule),
      // canActivate: [ AuthGuard ]
    },
    {
      path: 'public-form',
      loadChildren: () => import('./pages/public-form/public-form.module').then(x => x.PublicFormModule)
    },
    {
      path: 'error',
      loadChildren: () => import('./pages/errors/error.module').then(x => x.ErrorModule)
    },
    {
      path: '**',
      redirectTo: 'home'
    }
];