import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import {QuestionComponent} from './question/question.component';
import {PollComponent} from './poll/poll.component';
import {HistorialComponent} from './historial/historial.component';

import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "question/:us/:id/:enu/:a/:b/:c/:d/:e/:res", component: QuestionComponent },
  { path:"poll/:us", component: PollComponent, pathMatch: 'full'},
  { path:"historial/:us", component: HistorialComponent, pathMatch: 'full'},
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
