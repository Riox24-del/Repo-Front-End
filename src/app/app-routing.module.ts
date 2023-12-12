import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'solicitud', component: SolicitudesComponent },
    {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // { path: 'formatos', component: FormatosComponent }, 
  // { path: 'convocatorias', component: ConvocatoriasComponent }, 
  // { path: 'convenios', component: ConveniosComponent },  

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
