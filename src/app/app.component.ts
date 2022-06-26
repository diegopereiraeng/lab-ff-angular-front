import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 11 Crud';

  getTitle(): string {
    return String("Harness");
  }

  allowPromotions(): boolean {
    return Boolean(true);
  }
  authenticated() { 
    return true;
  }

}
