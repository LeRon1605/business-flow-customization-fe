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
      path: '**',
      redirectTo: 'home'
    }
];