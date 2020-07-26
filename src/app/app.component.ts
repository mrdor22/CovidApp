import { Component, ViewChild, ElementRef } from '@angular/core';
import { DMODEL } from './model/DMODEL.mode';
import { DataService } from './data.service';
import {  ChartsModule } from 'ng2-charts';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // @ViewChild('li')
  li: ElementRef;
  global: boolean;
  country: string;
  data: DMODEL;
  dailyData: any[];
  countries: any[];
  date : string = new Date().toDateString();
  lineChartData: any[] = [
    {data: [65,64,33,44], label: 'no important label'
  }
  ];
  lineChartType = "line";
  lineChartBottomLabels: any[] = [
    'label01','label02','label03'
  ];
  barChartType = "bar";
  barChartLabels : any[] = [
    'Infected','Recovered','Deaths'
  ];
  barChartData : any = [
    { data: [101,202,301], label: 'Lable'}
  ];

  constructor(private api: DataService,
    private viewportScroller: ViewportScroller) {

    this.data = new DMODEL();
  }
  ngOnInit(): void{
    this.getDailyData();
    this.global = true;
    this.getData();
   this.getCountries();
  }


  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
}


  getData(){
    this.api.getAllData().subscribe((res: any[]) => {
      this.data.confirmed = res['confirmed']['value'];
      this.data.recovered = res['recovered']['value'];
      this.data.deaths = res['deaths']['value'];
      this.data.lastUpdate = res['value'];
    });
  }

  getCountries() {
    this.api.getCountry().subscribe((res: any[]) => {
      var countries = res['countries'];
      this.countries = countries.map((name) => name['name']);
    })
  }

  getDataByCountry(country: string) {
   this.api.getDataByCountry(country).subscribe((res: any[]) => {
     this.data.confirmed = res['confirmed']['value'];
     this.data.recovered = res['recovered']['value'];
     this.data.deaths = res['deaths']['value'];
     this.data.lastUpdate = res['lastUpdate'];

     this.barChartData = [{
       data: [this.data.confirmed,this.data.recovered,this.data.deaths],
       label: 'People'
      }];
    })
  }

  getDailyData(){
  this.api.getDailyData().subscribe((response: any[]) => {
    this.lineChartBottomLabels = response.map((date) => date['reportDate']);
    var infectedInfo = response.map((confirmed) => confirmed['totalConfirmed']);

    var deaths = response.map((x) => x['deaths']['total']);
    var recovered = response.map((rev) => rev);

    this.lineChartData = [
      {
      data: infectedInfo,
      label: 'Infected',
    },
    {
      data: deaths,
      label: 'Deaths'
    },

  ]
  });
  }

  cChanged(value: string) {
    this.country = value;
    if(value == 'global') {
      this.getData();
      this.global = true;
    }
     else {
       this.getDataByCountry(value);
       this.global = false;
     }
  }
  
   toHome() {
    document.getElementById("AncholId3").scrollIntoView({behavior: "smooth"});
   }
 toStats() {
   document.getElementById("AnchorId2").scrollIntoView({behavior: "smooth"});
 }

 toContact() {
  document.getElementById("AnchorId").scrollIntoView({behavior: "smooth"});
 }

}
