import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { MasterGuard } from './guard/master.guard';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'centro',
    pathMatch: 'full',
  },
  //TODO: routes init
  // {
  //   path: '',
  //   loadComponent() {
  //     return import('./modules/home/pages/carousel/carousel.component');
  //   },
  //   // component: CarouselComponent,
  //   title: 'Carousel',
  // },
  {
    path: 'centro',
    loadComponent() {
      return import('./modules/home/pages/inicio/inicio.component');
    },
    // component: CarouselComponent,
    title: 'Bienvenida Centro',
  },
  {
    path: 'calima',
    loadComponent() {
      return import('./modules/home/pages/inicio/inicio.component');
    },
    // component: CarouselComponent,
    title: 'Bienvenida calima',
  },
  {
    path: 'avsexta',
    loadComponent() {
      return import('./modules/home/pages/inicio/inicio.component');
    },
    // component: CarouselComponent,
    title: 'Bienvenida avsexta',
  },
  {
    path: 'pasoancho',
    loadComponent() {
      return import('./modules/home/pages/inicio/inicio.component');
    },
    // component: CarouselComponent,
    title: 'Bienvenida pasoancho',
  },
  {
    path: 'cosmocentro',
    loadComponent() {
      return import('./modules/home/pages/inicio/inicio.component');
    },
    // component: CarouselComponent,
    title: 'Bienvenida cosmocentro',
  },

  {
    path: 'centro/promocion',
    loadComponent() {
      return import('./modules/home/pages/promocion/promocion.component');
    },
    // component: CarouselComponent,
    title: 'Promocion Centro',
  },
  {
    path: 'calima/promocion',
    loadComponent() {
      return import('./modules/home/pages/promocion/promocion.component');
    },
    // component: CarouselComponent,
    title: 'Promocion Calima',
  },
  {
    path: 'avsexta/promocion',
    loadComponent() {
      return import('./modules/home/pages/promocion/promocion.component');
    },
    // component: CarouselComponent,
    title: 'Promocion Avsexta',
  },
  {
    path: 'pasoancho/promocion',
    loadComponent() {
      return import('./modules/home/pages/promocion/promocion.component');
    },
    // component: CarouselComponent,
    title: 'Promocion Pasoancho',
  },
  {
    path: 'cosmocentro/promocion',
    loadComponent() {
      return import('./modules/home/pages/promocion/promocion.component');
    },
    // component: CarouselComponent,
    title: 'Promocion Cosmocentro',
  },

  //TODO: Ruote login
  {
    path: 'login',
    loadComponent() {
      return import('./pages/login/login.component');
    },
    title: 'Login',
  },
  //TODO: Route asesor
  {
    path: 'asesor',
    // pathMatch: 'full',

    loadComponent() {
      return import('./modules/home/components/nabvar/nabvar.component');
    },
    children: [
      {
        path: '',
        // pathMatch: 'full',
        loadComponent() {
          return import('./modules/home/pages/asesor/asesor.component');
        },
        title: 'Asesor Comercial',
      },
      {
        path: 'arte',
        loadComponent() {
          return import('./modules/home/pages/asesor/asesor.component');
        },
        title: 'Catálogo de Arte',
      },
      {
        path: 'cacharro',
        loadComponent() {
          return import('./modules/home/pages/asesor/asesor.component');
        },
        title: 'Catálogo de Cacharro',
      },
      {
        path: 'cosmeticos',
        loadComponent() {
          return import('./modules/home/pages/asesor/asesor.component');
        },
        title: 'Catálogo de Cosmeticos',
      },
      {
        path: 'institucional',
        loadComponent() {
          return import('./modules/home/pages/asesor/asesor.component');
        },
        title: 'Catálogo de Institucional',
      },
      {
        path: 'libros',
        loadComponent() {
          return import('./modules/home/pages/asesor/asesor.component');
        },
        title: 'Catálogo de Libros',
      },
      {
        path: 'papeleria',
        loadComponent() {
          return import('./modules/home/pages/asesor/asesor.component');
        },
        title: 'Catálogo de Papeleria',
      },
      {
        path: 'tecnologia',
        loadComponent() {
          return import('./modules/home/pages/asesor/asesor.component');
        },
        title: 'Catálogo de Tecnologia',
      },
      {
        path: 'detalle/:id',
        loadComponent() {
          return import('./modules/home/components/detalle/detalle.component');
        },
        title: 'Detalle de producto',
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
      {
        path: 'update/:id',
        loadComponent() {
          return import('@admin/components/forms/forms.component');
        },
        title: 'Actualizar',
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
        path: 'uploadinformation',
        title: 'Upload Informacion',
        loadComponent() {
          return import(
            '@master/components/informationupload/informationupload.component'
          );
        },
      },
      {
        path: 'forms',
        title: 'Formulario',
        loadComponent() {
          return import('@master/components/status-post/status-post.component');
          // return import('@master/components/forms/forms.component');
        },
      },
      {
        path: 'delete/storages',
        title: 'Borrar imagenes',
        loadComponent() {
          return import(
            '@master/components/delete/storages/storages.component'
          );
          // return import('@master/components/forms/forms.component');
        },
      },
      {
        path: 'delete/informationstorages',
        title: 'Borrar información',
        loadComponent() {
          return import(
            '@master/components/delete/information-storages/information-storages.component'
          );
          // return import('@master/components/forms/forms.component');
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
  {
    path: '**',
    component: ErrorpageComponent,
    title: 'Pagina error  ',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
