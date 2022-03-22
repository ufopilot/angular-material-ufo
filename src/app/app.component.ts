import { Component, ViewEncapsulation } from '@angular/core';
import {trigger, animate, style, group, animateChild, query, stagger, transition, state} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])
  ]
})
export class AppComponent {
  title = 'myapp';
  showFiller = false;
  panelOpenState = false;
  searchValue = '';
  searchVisibility = "hidden";
  menu: any;
  public isAuthenticated = false;

  constructor() { 
    this.menu = [{
      "name": "Dahboards",
      "subitems":[
        {
          "name": "Dahboard1",
          "route": "dashboard1",
        },
        {
          "name": "Dahboard2",
          "route": "dashboard2",
        }
      ]
    },
    {
      "name": "Serives",
      "route": "services",
    }]

  }

  ngOnInit(): void {
    
  }

  //[style.visibility]="searchVisibility ? 'visible' : 'hidden'"
  toggleSerchfield(){
    if (this.searchVisibility === 'hidden')
    this.searchVisibility = 'shown';
    else
    this.searchVisibility = 'hidden';
  }

  public logout(): void {
    // todo
  }
  
}
