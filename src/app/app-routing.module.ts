import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './@shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: async () => (await import('./authentication/authentication.module')).AuthenticationModule
    },
    {
        path: 'beranda',
        loadChildren: async () => (await import('./beranda/beranda.module')).BerandaModule
    },
    {
        path: 'setup-data',
        loadChildren: async () => (await import('./setup-data/setup-data.module')).SetupDataModule
    },
    {
        path: 'pembelian',
        loadChildren: async () => (await import('./pembelian/pembelian.module')).PembelianModule
    },
    {
        path: 'inventory',
        loadChildren: async () => (await import('./inventory/inventory.module')).InventoryModule
    },
    {
        path: 'pos',
        loadChildren: async () => (await import('./point-of-sales/pos.module')).PointOfSaleModule
    },
    {
        path: 'penjualan',
        loadChildren: async () => (await import('./penjualan/penjualan.module')).PenjualanModule
    },
    {
        path: "**", component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top',useHash:true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
