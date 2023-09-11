import { NgModule } from '@angular/core';
import {LoginComponent} from './pages/login/login.component'
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InstrucaoComponent } from './pages/instrucao/instrucao.component';
import { QuestaoComponent } from './pages/questao/questao.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RankingComponent } from './pages/ranking/ranking.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"user/:id", component:HomeComponent},
  {path:"login", component:LoginComponent, /*canActivate:[AuthGuard]*/},
  {path:"ranking", component:RankingComponent},
  {path:"ranking/:id", component:RankingComponent},
  {path:"user/:id/quiz/:slug", component:InstrucaoComponent},
  {path:"user/:id/quiz/:slug/questoes", component:QuestaoComponent},
  {path:"inicio", component:InicioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
