import { Component, OnInit } from '@angular/core';
import { CountdownModule, CountdownConfig, CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'countdown';

  startDate = Date.now();

  //M/d/yy, h:mm a' Date formats: https://angular.io/api/common/DatePipe#usage-notes
  fowardDate = new Date("08/21/20, 11:49 PM").valueOf();

  //Result date from timeNow -Foward date
  resultDate = (this.fowardDate - this.startDate) / 1000;

  //Units used for convertion.
  CountdownTimeUnits: Array<[string, number]> = [
    ['Y', 1000 * 60 * 60 * 24 * 365], // years
    ['M', 1000 * 60 * 60 * 24 * 30], // months
    ['D', 1000 * 60 * 60 * 24], // days
    ['H', 1000 * 60 * 60], // hours
    ['m', 1000 * 60], // minutes
    ['s', 1000], // seconds
    ['S', 1], // million seconds
  ];


  ngOnInit() {
    console.log(this.startDate);
    console.log(this.fowardDate);
    console.log((this.fowardDate - this.startDate) / (1000));
  }


  prettyConfig: CountdownConfig = {
    leftTime: this.resultDate,
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return this.CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
            return v.toString().padStart(match.length, '0');
          });
        }
        return current;
      }, formatStr);
    },
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>
      <span class="item2">:</span>   `)
        .join('');
    },
  };


}
