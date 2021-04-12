import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
  allMatches;
  savedData = [];
  loading=false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllMatches();
  }

  getAllMatches() {
    this.loading=true;
    this.http
      .get(
        'https://api.foursquare.com/v2/venues/search?ll=40.7484,-73.9857&oauth_token=NPKYZ3WZ1VYMNAZ2FLX1WLECAWSMUVOQZOIDBN53F3LVZBPQ&v=20180616'
      )
      .subscribe(
        (res) => {
          this.allMatches = res;
          this.allMatches = this.allMatches.response.venues;
          const data = JSON.parse(localStorage.getItem('savedData'));
          if (data) {
            data.map((ele) => {
              this.allMatches.map((item) => {
                if (ele.id === item.id) {
                  item.saved = true;
                  console.log('found');
                }
              });
            });
          }
          this.loading=false;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  addToLocalStorage(el) {
    el.saved = true;
    let found = false;
    const data = JSON.parse(localStorage.getItem('savedData'));
    if (data) {
      this.savedData = data;
      this.savedData.map((element) => {
        if (el.id === element.id) {
          element = el;
          found = true;
        }
      });
      if (!found) {
        this.savedData.push(el);
      }
    } else {
      this.savedData.push(el);
    }
    localStorage.setItem('savedData', JSON.stringify(this.savedData));
  }

  removeFromLocalStorage(el) {
    el.saved = false;
    let found = false;
    const data = JSON.parse(localStorage.getItem('savedData'));
    if (data) {
      this.savedData = data;
      this.savedData.map((element, index) => {
        if (el.id === element.id) {
          this.savedData.splice(index, 1);
        }
      });

    } else {
      this.allMatches.map((item) => {
        item.saved = false;
      });
    }
    localStorage.setItem('savedData', JSON.stringify(this.savedData));
  }
}
