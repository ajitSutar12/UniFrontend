import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  application_id

  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  gotoPrint(value) {
    this.router.navigateByUrl('/Payment/Receipt', { state: value });
  }

}
