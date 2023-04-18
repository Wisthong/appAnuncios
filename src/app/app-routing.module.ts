import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'carousel',
    pathMatch: 'full',
  },
  {
    path: 'carousel',
    component: CarouselComponent,
    title: 'Carousel',
  },
  {
    path: 'admin',
    loadComponent() {
      return import('./modules/admin/components/navbar/navbar.component');
    },
    title: 'Admin',
    children: [
      {
        path: 'upload',
        loadComponent() {
          return import('./modules/admin/components/upload/upload.component');
        },
        title: 'Upload',
        canActivate: [() => inject(AuthGuard).canActivate()],
        canMatch: [() => inject(AuthGuard).canMatchFn()],
      },
      {
        path: 'forms',
        loadComponent() {
          return import('./modules/admin/components/forms/forms.component');
        },
        title: 'Forms',
        canActivate: [() => inject(AuthGuard).canActivate()],
        canMatch: [() => inject(AuthGuard).canMatchFn()],
      },
    ],
  },
  {
    path: 'login',
    loadComponent() {
      return import('./pages/login/login.component');
    },
    title: 'Login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
