import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data: any;
  searchForm: FormGroup;
  rawData: any;
  getCountryUrl = 'https://restcountries.eu/rest/v2/all';

  constructor(private http: HttpClient) {
    this.searchForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    //rest call to URL
    this.http.get(this.getCountryUrl).subscribe((resp) => {
      this.rawData = resp;
      this.data = resp;
    });

    this.searchForm.controls['name'].valueChanges.subscribe((formvalue) => {
      if (formvalue != undefined && formvalue != '' && formvalue.trim() != '') {
        let items = this.rawData.filter((item) =>
          item.name.toLowerCase().includes(formvalue.toLowerCase())
        );
        this.data = items;
      } else {
        this.data = this.rawData;
      }
    });
  }
}
