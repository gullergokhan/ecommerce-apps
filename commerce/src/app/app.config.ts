import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

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
                  loadComponent: () => import("./components/home/home.component")
                      .then(c => c.HomeComponent)
              },
            
             
            //   { path: "products/:productId",
            //       component: ProductDetailsComponent },
              {
                  path: "products",
                  loadComponent: () => import("./components/product-list/product-list.component")
                      .then(c => c.ProductListComponent)
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