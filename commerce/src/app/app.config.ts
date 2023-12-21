import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const appConfig : ApplicationConfig ={
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      CommonModule,
      RouterModule.forRoot([
   
        {
          path: "",
          loadComponent: () => import("./components/layouts/layouts.component")
              .then(c => c.LayoutsComponent),
          children: [
              {
                  path: "",
                  loadComponent: () => import("../pages/home/home.component")
                      .then(c => c.HomeComponent)
              },
            
             
               { path: "products/:id",
                   component: ProductDetailComponent },
              {
                  path: "products",
                  loadComponent: () => import("./components/product-list/product-list.component")
                      .then(c => c.ProductListComponent)
              },
              {
                path: "baskets",
                loadComponent: () => import("./components/basket/basket.component")
                    .then(c => c.BasketComponent)
            },
            {
              path: "checkouts",
              loadComponent: () => import("./components/checkout/checkout.component")
                  .then(c => c.CheckoutComponent)
          },
          {
            path: "order-completed",
            loadComponent: () => import("../pages/order-completed/order-completed.component")
                .then(c => c.OrderCompletedComponent)
        },
            
              
          ]
      },
      {
          path: "**",
          loadComponent: () => import("./components/not-found/not-found.component")
              .then(c => c.NotFoundComponent)
      }
  ]), BrowserModule),
     
  ],
};