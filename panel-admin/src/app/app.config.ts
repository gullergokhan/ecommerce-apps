import { CommonModule } from "@angular/common";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

export const appConfig : ApplicationConfig ={
    providers: [
      provideHttpClient(),
      importProvidersFrom(CommonModule,HttpClient, RouterModule.forRoot([
          {
              path: "login",
              loadComponent: () => import("./components/Auth/components/login/login.component")
                  .then(c => c.LoginComponent)
          },
          {
              path: "register",
              loadComponent: () => import("./components/Auth/components/register/register.component")
                  .then(c => c.RegisterComponent)
          },
          {
              path: "category",
              loadComponent: () => import("./components/category/category.component")
                  .then(c => c.CategoryComponent)
          },
          {
              path: "add-category",
              loadComponent: () => import("./components/category/add-category/add-category.component")
                  .then(c => c.AddCategoryComponent)
          },
          {
              path: "category/update/:id",
              loadComponent: () => import("./components/category/update-category/update-category.component")
                  .then(c => c.UpdateCategoryComponent)
          },
          {
              path: "product",
              loadComponent: () => import("./components/product/product.component")
                  .then(c => c.ProductComponent)
          },
          {
              path: "add-product",
              loadComponent: () => import("./components/product/add-product/add-product.component")
                  .then(c => c.AddProductComponent)
          },
          {
              path: "product/update/:id",
              loadComponent: () => import("./components/product/update-product/update-product.component")
                  .then(c => c.UpdateProductComponent)
          },
          
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
                
              ]
          },
          {
              path: "**",
              loadComponent: () => import("./components/not-found/not-found.component")
                  .then(c => c.NotFoundComponent)
          }
      ]), BrowserModule),
      provideAnimations()
  ]
  };