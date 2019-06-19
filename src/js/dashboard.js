"use strict";

/* eslint-disable object-curly-newline */

/* global Chart */
//import  Reader from 'fstream' 
//

/**
 * --------------------------------------------------------------------------
 * CoreUI Free Boostrap Admin Template (v2.1.14): main.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */

/* eslint-disable no-magic-numbers */
// random Numbers
var random = function random() {
  return Math.round(Math.random() * 100);
};

var finRez = null;

var papa2 = function papa2(textString) {
  var data = Papa.parse(textString, {
    header: true
  });
  finRez = data.data;
  return data.data;
};

function uslovGodine(human) {
  if (this == "18-24") return human.Age == -0.95197;else if (this == "25-34") return human.Age == -0.07854;else if (this == "35-44") return human.Age == 0.49788;else if (this == "45-54") return human.Age == 1.09449;else if (this == "55-64") return human.Age == 1.82213;else if (this == "65-74") return human.Age == 2.59171;
}

function uslovHeroin(human) {
  if (this.ucestalost == "Never Used") return human[this.droga] == 0;else if (this.ucestalost == "Used over a Decade Ago") return human[this.droga] == 1;else if (this.ucestalost == "Used in Last Decade") return human[this.droga] == 2;else if (this.ucestalost == "Used in Last Year") return human[this.droga] == 3;else if (this.ucestalost == "Used in Last Month") return human[this.droga] == 4;else if (this.ucestalost == "Used in Last Week") return human[this.droga] == 5;else if (this.ucestalost == "Used in Last Day") return human[this.droga] == 6;
}

function ObradiDrogu(podaci, ucestalost, droga) {
  if (podaci) {
    var novi = podaci.filter(uslovHeroin, {
      ucestalost: ucestalost,
      droga: droga
    });
    return novi;
  }
}

function Inicijaliziraj() {
  return new Promise(function (resolve) {
    fetch('../../../Book1.csv').then(function (response) {
      return response.text();
    }).then(function (text) {
      var pom = papa2(text);
      resolve(pom);
    });
  });
}

function godLabele() {
  return ["18-24", "25-34", "35-44", "45-54", "55-64", "65-74"];
}

function drugLabele() {
  return ["Never Used", "Used over a Decade Ago", "Used in Last Decade", "Used in Last Year", "Used in Last Month", "Used in Last Week", "Used in Last Day"];
}

function ObradiGodine(podaci, godine) {
  if (podaci) {
    var novi = podaci.filter(uslovGodine, godine); //console.log(novi);

    return novi;
  }
}

function CountGodine(podaci, godine) {
  var novi = ObradiGodine(podaci, godine); //console.log(novi.length);

  return novi.length;
}

function CountDrogu(podaci, ucestalost, droga) {
  return ObradiDrogu(podaci, ucestalost, droga).length;
}

function SveGod(podaci) {
  var novi = godLabele();
  var n2 = novi.map(function (element) {
    return CountGodine(podaci, element);
  }); //console.log(n2);

  return n2;
}

function napraviLineChart() {
  Inicijaliziraj().then(function (result) {
    var lineChart = new Chart($('#canvas-1'), {
      type: 'line',
      data: {
        labels: godLabele(),
        //labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
          borderColor: 'rgba(220, 220, 220, 1)',
          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          pointBorderColor: '#fff',
          data: SveGod(result)
        }]
      },
      options: {
        responsive: true
      }
    });
  });
}

function napraviBarChart() {
  Inicijaliziraj().then(function (result) {
    var godineL = godLabele();
    var data = [];
    godineL.forEach(function (element) {
      var poedGod = ObradiGodine(result, element);
      var godDroga = ObradiDrogu(poedGod, "Used in Last Day", "Heroin");
      data.push(godDroga.length);
    });
    console.log(data);
    console.log(godineL);
    var barChart = new Chart($('#canvas-1'), {
      type: 'bar',
      data: {
        labels: godineL,
        datasets: [{
          backgroundColor: 'rgba(220, 220, 220, 0.5)',
          borderColor: 'rgba(220, 220, 220, 0.8)',
          highlightFill: 'rgba(220, 220, 220, 0.75)',
          highlightStroke: 'rgba(220, 220, 220, 1)',
          data: data
        }, {
          backgroundColor: 'rgba(151, 187, 205, 0.5)',
          borderColor: 'rgba(151, 187, 205, 0.8)',
          highlightFill: 'rgba(151, 187, 205, 0.75)',
          highlightStroke: 'rgba(151, 187, 205, 1)',
          data: data
        }]
      },
      options: {
        responsive: true
      }
    });
  });
}

function napraviDoughnutChart() {
  Inicijaliziraj().then(function (result) {
    var godineL = godLabele();
    var data2 = [];
    godineL.forEach(function (element) {
      var poedGod = ObradiGodine(result, element);
      var godDroga = ObradiDrogu(poedGod, "Used in Last Day", "Heroin");
      data2.push(godDroga.length);
    }); // eslint-disable-next-line no-unused-vars

    var doughnutChart = new Chart($('#canvas-1'), {
      type: 'doughnut',
      data: {
        labels: godineL,
        datasets: [{
          data: data2,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      },
      options: {
        responsive: true
      }
    });
  });
}

function napraviRadarChart() {
  Inicijaliziraj().then(function (result) {
    // eslint-disable-next-line no-unused-vars
    var radarChart = new Chart($('#canvas-4'), {
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
          borderColor: 'rgba(220, 220, 220, 1)',
          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          pointBorderColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220, 220, 220, 1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        }, {
          label: 'My Second dataset',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: 'rgba(151, 187, 205, 1)',
          pointBackgroundColor: 'rgba(151, 187, 205, 1)',
          pointBorderColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151, 187, 205, 1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }]
      },
      options: {
        responsive: true
      }
    });
  });
}

function napraviPieChart() {
  Inicijaliziraj().then(function (result) {
    var pieChart = new Chart($('#canvas-5'), {
      type: 'pie',
      data: {
        labels: ['Red', 'Green', 'Yellow'],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
      },
      options: {
        responsive: true
      }
    });
  });
}

function napraviPolarChart() {
  Inicijaliziraj().then(function (result) {
    var polarAreaChart = new Chart($('#canvas-6'), {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [{
          data: [11, 16, 7, 3, 14],
          backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
        }]
      },
      options: {
        responsive: true
      }
    });
  });
}

napraviLineChart();
//# sourceMappingURL=dashboard.js.map