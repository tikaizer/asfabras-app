import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private mensagem = 'Página Inicial.';

  data: any;

  constructor() {

    this.data = {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro','Novembro','Dezembro'],
      datasets: [
          {
              label: 'Abertura de Job',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'Job Finalizados',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 86, 27, 90, 59, 80, 81, 56, 55, 40]
          }
      ]
  };
}
}
