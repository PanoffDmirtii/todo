import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {BoardComponent} from './components/board/board.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './shared/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderComponent} from './shared/loader/loader.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {AuthGuard} from './services/auth.guard';
import {ItemTodoComponent} from './components/item-todo/item-todo.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';

import {environment} from '../environments/environment';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: '', redirectTo: '/board-todo', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'board-todo', component: BoardComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/board-todo'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    ModalComponent,
    LoaderComponent,
    AuthComponent,
    ItemTodoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule,
    MatSliderModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    CommonModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  // entryComponents: [ModalComponent]
})
export class AppModule {
}
