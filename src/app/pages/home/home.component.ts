import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RestApiService } from 'src/app/shared/rest-api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

export interface Element {
  number: number,
  name: string
  englishName: string,
  englishNameTranslation: string,
  numberOfAyahs: number,
  revelationType: string
}

const ELEMENT_DATA: Element[] = [];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements AfterViewInit  {
  displayedColumns: string[] = ['number', 'englishName', 'englishNameTranslation', 'numberOfAyahs', 'revelationType', 'name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  langs: string[] = [];
  selectedLanguage: string = "ar";
  editions:any []
  selectedEdition: string = ""
  languageNames = new Intl.DisplayNames(['en'], {
    type: 'language'
  });
  fileSource:any = 'https://media.sd.ma/assabile/recitations_7892537823/mp3/yasser-al-dossari-001-al-fatiha-4920-9396.mp3';
  
  // @ViewChild(MatPaginator)
  // paginator!: MatPaginator;
  // @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  constructor(public restApi: RestApiService, public router: Router) { 

    this.editions = [
      { 
        "identifier": "ar.muyassar",
        "language": "ar",
        "name": "تفسير المیسر",
        "englishName": "King Fahad Quran Complex",
        "format": "text",
        "type": "tafsir",
        "direction": "rtl"
      }
    ];
  }
  ngOnInit(): void {
     //throw new Error('Method not implemented.');
     

  }

  ngAfterViewInit() {
    this.restApi.getAllLanguages().subscribe((resp: any) => {
      this.langs = resp['data'];
    });
    this.loadEditions()

    this.restApi.getQuranMeta().subscribe((resp: any) => {
      this.dataSource = new MatTableDataSource(resp['data']['surahs']['references']);  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('content');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }

  getMeta() {
    // this.restApi.getQuranMeta().subscribe((resp: any) => {
    //   // this.router.navigate(['/employees-list']);
    //   this.dataSource = new MatTableDataSource(resp['data']['surahs']['references']);
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadEditions(){
    this.restApi.listAllEditionsForLanguage(this.selectedLanguage).subscribe((resp: any) => {
      this.editions = resp['data'];
    });
  }

  getEdition(){
    console.log(this.selectedEdition)
  }
}