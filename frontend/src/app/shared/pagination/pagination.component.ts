import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  pagination:any = []
  datas:any = []

  @Input('datasPagination') set datasPagination(datas:any){
    this.pagination = []
    this.datas = datas
    if(datas){
      this.setPageRequest()
    }
  }

  @Output('dataList') dataList = new EventEmitter();

  faAngleDoubleLeft = faAngleDoubleLeft
  faAngleLeft = faAngleLeft
  faAngleDoubleRight = faAngleDoubleRight
  faAngleRight = faAngleRight

  constructor() { }

  ngOnInit(): void {

  }

  setPageRequest(page?:any) {
    if(page){
      this.datas.page = page
    }

     this.datas.service.getPage(this.datas).subscribe((datas:any) => {
      this.pagination = []
      this.dataList.emit(datas.list)
      this.datas.count = datas.count
      let numbersPages = Math.ceil(this.datas.count / this.datas.rowsPerPage)
      for(let i = 1; i <= numbersPages; i++){
        this.pagination.push(i.toString())
      }
     })
  }

  setPagination(){

  }

}
