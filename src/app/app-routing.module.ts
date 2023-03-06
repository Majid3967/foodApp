import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { CartItemResolveService } from './services/cart-items.resolve.service';
import { FoodItemResolveService } from './services/food-items.resolve.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home-content',
    loadChildren: () => import('./pages/home-content/home-content.module').then( m => m.HomeContentPageModule)
  },
  {
    path: 'deals-page',
    loadChildren: () => import('./pages/deals-page/deals-page.module').then( m => m.DealsPagePageModule)
  },
  {
    path: 'food-item-details',
    loadChildren: () => import('./pages/food-item-details/food-item-details.module').then( m => m.FoodItemDetailsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'cart',
    resolve:{cartItems:CartItemResolveService},
    canActivate:[AuthGuard],
    loadChildren: () => import('./pages/cart/cart.module').then( m => m.CartPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
