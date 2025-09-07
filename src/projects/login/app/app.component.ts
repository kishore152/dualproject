//import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Component,HostListener, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';
import { SpinnerComponent } from './layout/spinner/spinner.component';

declare var require: any;

declare let $: any;

declare global {
  interface env {
    path: 'http://127.0.0.1:5000/app/api';
  }
}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule,SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  private locomotiveScroll: any;


  title = 'beta';
  isScrolled:boolean=false
  url:any;
  constructor(private route: ActivatedRoute, private router: Router,private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: object){
    this.router.events.subscribe(event => {
      
    });  

  }

    navigateTo(url: string) {

    }
   
}
