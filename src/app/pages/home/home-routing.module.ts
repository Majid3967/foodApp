import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodItemResolveService } from 'src/app/services/food-items.resolve.service';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path:'tabs',
    component: HomePage,
    children:[
      {
        path:'home-content',
        resolve:{foodItems:FoodItemResolveService},
        children:[
          {
            path:'',
            loadChildren: () => import('../home-content/home-content.module').then(m=>m.HomeContentPageModule)
          },
          {
            path:':itemId',
            loadChildren: () => import('../food-item-details/food-item-details.module').then(m=>m.FoodItemDetailsPageModule)
          }
        ]

      },
      {
        path:'deals',
        resolve:{foodItems:FoodItemResolveService},
        children:[
          {
            path:'',
            loadChildren: () => import('../deals-page/deals-page.module').then(m=>m.DealsPagePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo:'/home/tabs/home-content',
        pathMatch:'full'
      }
    ]
  },
  {
    path: '',
    redirectTo:'/home/tabs/home-content',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
