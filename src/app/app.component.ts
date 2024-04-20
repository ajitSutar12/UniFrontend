import { google } from '@agm/core/services/google-maps-types';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Online Payment System';

  

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  constructor(private router: Router,private idle: Idle, private keepalive: Keepalive) { 
    
    // alert()
    // sets an idle timeout of 5 minutes, for testing purposes.
    idle.setIdle(300);
    // sets a timeout period of 5 minutes. after 10 minutes of inactivity, the user will be considered timed out.
    idle.setTimeout(300);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => 
    this.idleState = 'No longer idle.'
    );
    idle.onTimeout.subscribe(() => {
      console.log('Working');
      this.clickMe();
      window.close()
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

  clickMe(){
    console.log('Working');
    // open('https://www.unishivaji.ac.in/', '_self')
  }

}
