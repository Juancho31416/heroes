import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }   from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { LocalStorageModule } from 'angular-2-local-storage';


@NgModule({
    imports:      [ 
        BrowserModule,
        HttpModule,
        FormsModule,
        BootstrapModalModule,
        LocalStorageModule.withConfig({
            prefix: 'Marvel-SPA',
            storageType: 'localStorage'
        })
    ],
    
    declarations: [ 
        AppComponent, ModalComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
