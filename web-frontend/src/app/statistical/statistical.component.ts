import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {Book} from '../model/book';
import {FormControl, FormGroup} from '@angular/forms';
import {BookService} from '../service/book.service';

Chart.register(...registerables);

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  statistic: Book[] = [];
  myChart: any = {};
  startDate: any;
  endDate: any;

  form: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  constructor(private book: BookService) {
    Chart.register(...registerables);
  }

  getStatistic() {
    this.book.getListSellingTop10(this.startDate, this.endDate).subscribe(value => {
      this.statistic = value;
      console.log(value);
      const label = [];
      const data = [];
      for (let i = 0; i < this.statistic.length; i++) {
        label[i] = this.statistic[i].name;
        console.log(label[i]);
        data[i] = this.statistic[i].sumQuantity;
      }
      this.myChart.destroy();
      this.myChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: label,
          datasets: [{
            label: 'Số lượng mua',
            data,
            backgroundColor: [
              '#EBA850'
            ],
            borderColor: [
              '#EBA850',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }


  ngOnInit(): void {
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['', '', '', '', '', ''],
        datasets: [{
          label: 'Số lượng mua',
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: [
            '#EBA850',
          ],
          borderColor: [
            '#EBA850',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  submitForm() {
    this.startDate = this.form.value.startDate;
    this.endDate = this.form.value.endDate;
    this.getStatistic();
  }

}
