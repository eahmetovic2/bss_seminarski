/* eslint-disable object-curly-newline */
/* global Chart */
import  * as Papa from 'papaparse' 
//import  Reader from 'fstream' 
import $ from 'jquery'
 //
/**
 * --------------------------------------------------------------------------
 * CoreUI Free Boostrap Admin Template (v2.1.14): main.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */

/* eslint-disable no-magic-numbers */
// random Numbers
const random = () => Math.round(Math.random() * 100)

let finRez=null;

const papa2 = (textString) => {
    var data = Papa.parse(textString,{header:true});
    finRez=data.data;
    return data.data;
}

function Inicijaliziraj() {
  return new Promise(resolve => {
    fetch('../../../Book1.csv')
    .then(response => response.text())
    .then(text => {
      let pom=papa2(text);
      resolve(pom)
    })
  });
}

function UcitajNscore() {
  return new Promise(resolve => {
    console.log(USLO);
    fetch('../../../nscore.csv')
    .then(response => response.text())
    .then(text => {
      let pom=papa2(text);
      console.log(text);
      console.log(pom);
      resolve(pom)
    })
  });
}

function uslovGodine(human) {
  if(this=="18-24")
    return human.Age==-0.95197;
  else if(this=="25-34")
    return human.Age==-0.07854;
  else if(this=="35-44")
    return human.Age==0.49788;
  else if(this=="45-54")
    return human.Age==1.09449;
  else if(this=="55-64")
    return human.Age==1.82213;
  else if(this=="65-74")
    return human.Age==2.59171;
}

function uslovSpol(human) {
  if(this=="Female")
    return human.Age==0.48246 ;
  else if(this=="Male")
    return human.Age==-0.48246;
}

function uslovEdukacija(human) {
  if(this=="Left school before 16 years")
    return human.Age==-2.43591;
  else if(this=="Left school at 16 years")
    return human.Age==-1.73790;
  else if(this=="Left school at 17 years")
    return human.Age==-1.43719;
  else if(this=="Left school at 18 years")
    return human.Age==-1.22751;
  else if(this=="Some college or university, no certificate or degree")
    return human.Age==-0.61113;
  else if(this=="Professional certificate/ diploma")
    return human.Age==-0.05921;
  else if(this=="University degree")
    return human.Age==0.45468;
  else if(this=="Masters degree")
    return human.Age==1.16365;
  else if(this=="Doctorate degree")
    return human.Age==1.98437;
}

function uslovDroga(human) {
  if(this.ucestalost=="Never Used")
    return human[this.droga]==0;
  else if(this.ucestalost=="Used over a Decade Ago")
    return human[this.droga]==1;
  else if(this.ucestalost=="Used in Last Decade")
    return human[this.droga]==2;
  else if(this.ucestalost=="Used in Last Year")
    return human[this.droga]==3;
  else if(this.ucestalost=="Used in Last Month")
    return human[this.droga]==4;
  else if(this.ucestalost=="Used in Last Week")
    return human[this.droga]==5;
  else if(this.ucestalost=="Used in Last Day")
    return human[this.droga]==6;
}

function ObradiDrogu(podaci,ucestalost,droga) {
  if(podaci) {
    let novi = podaci.filter(uslovDroga,{ucestalost,droga});
  return novi;
  }
}

function ObradiEdukaciju(podaci,stepenE) {
  if(podaci) {
    let novi = podaci.filter(uslovEdukacija,stepenE);
  return novi;
  }
}

function ObradiGodine(podaci,godine) {
  if(podaci) {
    let novi = podaci.filter(uslovGodine,godine);
    //console.log(novi);
    return novi;
  }
}




function godLabele(){
  return  ["18-24","25-34","35-44","45-54","55-64","65-74"]
}

function drugLabele(){
  return  ["Never Used","Used over a Decade Ago","Used in Last Decade",
  "Used in Last Year","Used in Last Month","Used in Last Week","Used in Last Day"]
}

function edukacijaLabele(){
  return  [ "Left school before 16 years","Left school at 16 years",
  "Left school at 17 years","Left school at 18 years",
  "Some college or university, no certificate or degree",
  "Professional certificate/ diploma","University degree","Masters degree","Doctorate degree"]
}

function edukacijaLabele(){
  return  [ "Left school before 16 years","Left school at 16 years",
  "Left school at 17 years","Left school at 18 years",
  "Some college or university, no certificate or degree",
  "Professional certificate/ diploma","University degree","Masters degree","Doctorate degree"]
}

function edukacijaLabele(){
  return [
      {nscore: 12,cases:1, value:  -3.46436}

  ]

}


function CountGodine(podaci,godine) {
  var novi = ObradiGodine(podaci,godine);
  //console.log(novi.length);
  return novi.length;
}

function CountDrogu(podaci,ucestalost,droga) {
  return ObradiDrogu(podaci,ucestalost,droga).length;
}

function SveGod(podaci) {
  var novi=godLabele();
  let n2=novi.map(element => {return CountGodine(podaci,element)});
  //console.log(n2);
  return n2;
}


function napraviLineChart()  {
  Inicijaliziraj().then(result => {
    const lineChart = new Chart($('#canvas-1'), {
        type: 'line',
        data: {
          labels: godLabele(),
          //labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets : [
            {
              label: 'My First dataset',
              backgroundColor : 'rgba(220, 220, 220, 0.2)',
              borderColor : 'rgba(220, 220, 220, 1)',
              pointBackgroundColor : 'rgba(220, 220, 220, 1)',
              pointBorderColor : '#fff',
              data : SveGod(result),
            },
          ]
        },
        options: {
          responsive: true
        }
      })
  })
}

function napraviBarChart() {
  Inicijaliziraj().then(result => {
    var godineL= godLabele();
    var data=[];
    godineL.forEach(element=>{
      let poedGod= ObradiGodine(result,element);
      let godDroga= ObradiDrogu(poedGod,"Used in Last Day","Heroin")
      data.push(godDroga.length);
    });
    console.log(data);
    console.log(godineL);

    const barChart = new Chart($('#canvas-1'), {
      type: 'bar',
      data: {
        labels : godineL,
        datasets : [
          {
            backgroundColor : 'rgba(220, 220, 220, 0.5)',
            borderColor : 'rgba(220, 220, 220, 0.8)',
            highlightFill: 'rgba(220, 220, 220, 0.75)',
            highlightStroke: 'rgba(220, 220, 220, 1)',
            data : data
          },
          {
            backgroundColor : 'rgba(151, 187, 205, 0.5)',
            borderColor : 'rgba(151, 187, 205, 0.8)',
            highlightFill : 'rgba(151, 187, 205, 0.75)',
            highlightStroke : 'rgba(151, 187, 205, 1)',
            data : data
          }
        ]
      },
      options: {
        responsive: true
      }
    })
  })
}

function napraviDoughnutChart() {
  Inicijaliziraj().then(result => {

    var godineL= godLabele();
    var data2=[];
    godineL.forEach(element=>{
      let poedGod= ObradiGodine(result,element);
      let godDroga= ObradiDrogu(poedGod,"Used in Last Day","Heroin")
      data2.push(godDroga.length);
    });
    // eslint-disable-next-line no-unused-vars
    const doughnutChart = new Chart($('#canvas-1'), {
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
    })
  })
}

function napraviRadarChart() {
  Inicijaliziraj().then(result => {

    // eslint-disable-next-line no-unused-vars
    const radarChart = new Chart($('#canvas-4'), {
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgba(220, 220, 220, 0.2)',
            borderColor: 'rgba(220, 220, 220, 1)',
            pointBackgroundColor: 'rgba(220, 220, 220, 1)',
            pointBorderColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220, 220, 220, 1)',
            data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
            label: 'My Second dataset',
            backgroundColor: 'rgba(151, 187, 205, 0.2)',
            borderColor: 'rgba(151, 187, 205, 1)',
            pointBackgroundColor: 'rgba(151, 187, 205, 1)',
            pointBorderColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151, 187, 205, 1)',
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]
      },
      options: {
        responsive: true
      }
    })
  })
}


function napraviPieChart() {
  Inicijaliziraj().then(result => {
      const pieChart = new Chart($('#canvas-5'), {
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
    })

  })
}

function napraviPolarChart() {
  Inicijaliziraj().then(result => {
    const polarAreaChart = new Chart($('#canvas-6'), {
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
    })

  })
}

function gumb1() {
  var values = [];
  var x = document.getElementsByTagName("input");
  x.forEach(element => {
    console.log(element.name,element.checked);
  });
  UcitajNscore().then(rezultat => console.log(rezultat));
}

napraviLineChart();

