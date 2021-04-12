import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-saved-matches',
  templateUrl: './saved-matches.component.html',
  styleUrls: ['./saved-matches.component.css']
})
export class SavedMatchesComponent implements OnInit {

  allMatches;
  sharedData;
  savedData: any;
  noData: boolean;
  constructor( private http:HttpClient) { }

  ngOnInit(): void {
    this.getSavedMatches();
  }

  getSavedMatches(){
    const data= JSON.parse( localStorage.getItem("savedData"));
    if(data.length>0){
      this.savedData=data;
      this.noData=false;
    }
    else{
      this.noData=true;
    }

  }


  removeFromLocalStorage(el){
    el.saved=true;
     const data= JSON.parse( localStorage.getItem("savedData"));
     if(data){
      this.savedData=data;
      this.savedData.map((element, index) => {
        if (el.id === element.id) {
          this.savedData.splice(index, 1);
        }
      });
     }
     if(this.savedData.length<1){
      this.noData=true;
     }
     localStorage.setItem("savedData",JSON.stringify(this.savedData));
  }
}
