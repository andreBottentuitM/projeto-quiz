import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  constructor(
    private rankingService: RankingService,
    private formBuilder: FormBuilder
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
    let quiz = {'quizName':this.formRanking.controls['rankingSelect'].value}

    this.rankingService.getRanking(quiz).subscribe(data=>{

      this.listScoresRanking = data
      console.log(this.listScoresRanking)
  })
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
