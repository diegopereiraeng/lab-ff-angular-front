import { Component } from '@angular/core';

// Feature Flags
import { FFService } from 'src/app/services/ff.service';

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
  constructor(private ff: FFService){
    if (!this.ff.flagExists('App_Title')) {
      ff.SetFlags('API_TUTORIALS_ENABLED',true);
    }
  }
  allowTutorials(): boolean {
    return Boolean(this.ff.GetFlags('API_TUTORIALS_ENABLED'));
  }

}
