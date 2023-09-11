import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  rankings:any = []
  listScoresRanking:any = []
  formRanking:FormGroup | any
  datasPagination:any

  constructor(
    private rankingService: RankingService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit(): void {
   this.loadSelect()
   this.rankings = this.getRanking()
  }

  loadSelect(){
    this.formRanking = this.formBuilder.group({
      rankingSelect: ["SE"]
   });
  }

  selectRanking(){

    let quiz = this.formRanking.controls['rankingSelect'].value
    this.router.navigate([`/ranking/${quiz}`],{queryParams: { page: `1` }})
      this.datasPagination = {
        rowsPerPage: 3,
        service: this.rankingService,
        selected: quiz,
        page: '1'
      }

  }

  dataList(event:any){
    console.log(event)
    this.listScoresRanking = event
  }


  getRanking(){
    return [
        {valor: 'SE',desc:"Selecione um ranking"},
        {valor: 'react',desc:"React"},
        {valor: 'angular',desc:"Angular"},
        {valor: 'node',desc:"Node"},
        {valor: 'sql',desc:"Sql"}
      ]
  }

}
