import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
      <h1>Page Not Found</h1><br>
      <h3>Go back to main</h3>
      <a class="btn btn-sm btn-success" routerLink="/main" routerLinkActive="active">Next</a>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
