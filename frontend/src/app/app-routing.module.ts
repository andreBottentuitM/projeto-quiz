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
  {path:"login", component:LoginComponent, /*canActivate:[AuthGuard]*/},
  {path:"ranking", component:RankingComponent},
  {path:"quiz", component:InstrucaoComponent},
  {path:"quiz/questao", component:QuestaoComponent},
  {path:"inicio", component:InicioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
