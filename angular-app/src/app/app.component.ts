import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
	public sidenavMode: "over" | "side";
	public sidenavOpened: boolean;
	@ViewChild("sidenav") public sidenav: MatSidenav;
  
	private mediaSubscription: Subscription;
  
	constructor(
		private media: MediaObserver) {		
		this.setSidenavMode();
		this.setSidenavOpened();
	}

	public ngOnInit(): void {
    this.mediaSubscription = this.media.media$
      .subscribe(() => {
        this.setSidenavMode();
      });
    }

    public ngOnDestroy(): void {
      this.mediaSubscription.unsubscribe();
    }

    public toggleSidenavClicked(): void {
      this.sidenav.toggle();
    }

    private setSidenavMode(): void {
      this.sidenavMode = this.media.isActive("xs") ? "over" : "side";
    }
  
    private setSidenavOpened(): void {
      var opened : boolean = true;
  
      if (opened) {
        this.sidenavOpened = this.sidenavMode != "over"; // always collapsed on mobile by default
      }
      else {
        this.sidenavOpened = false;
      }
    }
}