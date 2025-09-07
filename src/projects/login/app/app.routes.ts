import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { LayoutComponent } from './layout/layout/layout/layout.component';
import { ContactreportComponent } from './pages/contactreport/contactreport.component';
import { BlogComponent } from './pages/blog/blog.component';

export const routes: Routes = [
   
   {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
    },
    {
        path: 'layout',
        component: LayoutComponent,
        children: [
          { path: '', redirectTo: 'contactreport', pathMatch: 'full' },
          { path: 'contactreport', component: ContactreportComponent },
          { path: 'blog', component: BlogComponent }
        ]
      }
]; 
