import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/common/shared/shared.module';

@Component({
  selector: 'app-dashboard-widget',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent  {
  @Input() value:string;
  @Input() title:string;
  @Input() percentage:string;

  constructor(){
    this.value='';
    this.title='';
    this.percentage='';

  }
  

}