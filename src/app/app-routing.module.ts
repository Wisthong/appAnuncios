import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AuthGuard } from './guard/auth.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MasterGuard } from './guard/master.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: NavbarComponent,
    children: [
      {
        path: '',
        component: CarouselComponent,
        title: 'Carousel',
      },
      {
        path: 'login',
        loadComponent() {
          return import('./pages/login/login.component');
        },
        title: 'Login',
      },
    ],
  },

  //TODO: ADMIN
  {
    path: 'admin',
    loadComponent() {
      return import('@admin/components/navbar/navbar.component');
    },
    canActivate: [() => inject(AuthGuard).canActivate()],
    canMatch: [() => inject(AuthGuard).canMatchFn()],
    title: 'Admin',
    children: [
      {
        path: 'upload',
        loadComponent() {
          return import('@admin/components/upload/upload.component');
        },
        title: 'Upload',
      },
      {
        path: '',
        loadComponent() {
          return import('@admin/components/dashboard/dashboard.component');
        },
        title: 'Dashboard',
      },
      {
        path: 'forms',
        loadComponent() {
          return import('@admin/components/forms/forms.component');
        },
        title: 'Forms',
      },
    ],
  },

  //TODO: MASTER
  {
    path: 'master',
    loadComponent() {
      return import('@master/components/nabvar/nabvar.component');
    },
    title: 'Master',
    canActivate: [() => inject(MasterGuard).canActivate()],
    canMatch: [() => inject(MasterGuard).canMatchFn()],
    children: [
      {
        path: '',
        title: 'Dashboard',
        loadComponent() {
          return import('@master/components/dashboard/dashboard.component');
        },
      },
      {
        path: 'posts',
        title: 'Posts',
        loadComponent() {
          return import('@master/components/posts/posts.component');
        },
      },
      {
        path: 'upload',
        title: 'Upload',
        loadComponent() {
          return import('@master/components/upload/upload.component');
        },
      },
      {
        path: 'forms',
        title: 'Formulario',
        loadComponent() {
          return import('@master/components/forms/forms.component');
        },
      },
      {
        path: 'status/:id',
        title: 'Cambiar estado de Post',
        loadComponent() {
          return import('@master/components/status-post/status-post.component');
        },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
