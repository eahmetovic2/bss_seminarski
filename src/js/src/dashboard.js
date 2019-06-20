/* eslint-disable object-curly-newline */
/* global Chart */
import  * as Papa from 'papaparse' 
//import  Reader from 'fstream' 
import $ from 'jquery'
import 'babel-polyfill'
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

let state= {
  podaci:[],
  nscore:[],
  escore:[],
  oscore:[],
  ascore:[],
  cscore:[],
  drug:"NONE",
  ucestalost: null,
  label:"Age",
  labels:[]
}

const papa2 = (textString) => {
    var data = Papa.parse(textString,{header:true});
    finRez=data.data;
    return data.data;
}

//------------------------------ U C I T A V A NJ A ----------------------------------

function Inicijaliziraj() {
  return  new Promise(resolve => {
    fetch('../../../DataSet.csv')
    .then(response => response.text())
    .then(text => {
      let pom=papa2(text);

      resolve(pom)
    })
  });
}

function UcitajAscore() {
  return new Promise(resolve => {
    fetch('../../../ascore.csv')
    .then(response => response.text())
    .then(text => {
      let pom=papa2(text);
      resolve(pom)
    })
  });
}

function UcitajNscore() {
  return new Promise(resolve => {
    fetch('../../../nscore.csv')
    .then(response => response.text())
    .then(text => {
      let pom=papa2(text);
      resolve(pom)
    })
  });
}

function UcitajEscore() {
  return new Promise(resolve => {
    fetch('../../../escore.csv')
    .then(response => response.text())
    .then(text => {
      let pom=papa2(text);
      resolve(pom)
    })
  });
}

function UcitajOscore() {
  return new Promise(resolve => {
    fetch('../../../oscore.csv')
    .then(response => response.text())
    .then(text => {
      let pom=papa2(text);
      resolve(pom)
    })
  });
}

function UcitajCscore() {
  return new Promise(resolve => {
    fetch('../../../cscore.csv')
    .then(response => response.text())
    .then(text => {
      let pom=papa2(text);
      resolve(pom)
    })
  });
}

function UcitavanjeSvega() {
  Inicijaliziraj().then(results =>{ 
    state.podaci=results;
    state.podaci.length--;
    UcitajAscore().then(resulta => {
      state.ascore=resulta;
      state.ascore.length--;
      UcitajNscore().then(resultn => {
        state.nscore=resultn;
        state.nscore.length--;
        UcitajEscore().then(resulte => {
          state.escore=resulte;
          state.escore.length--;
          UcitajOscore().then(resulto => {
            state.oscore=resulto;
            state.oscore.length--;
            UcitajCscore().then(resultc => {
              state.cscore=resultc;
              state.cscore.length--;
              var x = document.getElementById("Ucitavanje");
              x.innerHTML = "Podaci su ucitani, mozete pristupiti aplikaciji!";

              //napraviLineChart(,);
              console.log("STATE",state);
            })
          })
        })
      })
    })
  })
}

UcitavanjeSvega();



//------------------------------ U S L O V I ----------------------------------

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
  else if(this=="65+")
    return human.Age==2.59171;
}

function uslovEtnicitet(human) {
  if(this=="Asian")
    return human.Ethnicity == -0.50212;
  else if(this=="Black")
    return human.Ethnicity == -1.10702;
  else if(this=="Mixed-Black/Asian")
    return human.Ethnicity == 1.90725;
  else if(this=="Mixed-White/Asian")
    return human.Ethnicity == 0.12600;
  else if(this=="Mixed-White/Black")
    return human.Ethnicity == -0.22166;
  else if(this=="Other")
    return human.Ethnicity == 0.11440;
  else if(this=="White")
    return human.Ethnicity == -0.31685 ;
}


function uslovSpol(human) {
  if(this=="Female")
    return human.Gender==0.48246;
  else if(this=="Male")
    return human.Gender==-0.48246;
}

function uslovEdukacija(human) {
  if(this=="Left school before 16 years")
    return human.Education==-2.43591;
  else if(this=="Left school at 16 years")
    return human.Education==-1.73790;
  else if(this=="Left school at 17 years")
    return human.Education==-1.43719;
  else if(this=="Left school at 18 years")
    return human.Education==-1.22751;
  else if(this=="Some college or university, no certificate or degree")
    return human.Education==-0.61113;
  else if(this=="Professional certificate/ diploma")
    return human.Education==-0.05921;
  else if(this=="University degree")
    return human.Education==0.45468;
  else if(this=="Masters degree")
    return human.Education==1.16365;
  else if(this=="Doctorate degree")
    return human.Education==1.98437;
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

function uslovScore(human) {
  var vrijednost = this.pom.find(element => {return element[this.vrstaScore]==this.intenzitetScore}).Value;
  return human[this.vrstaScore] == vrijednost;
}

//------------------------------ O B R A D E ----------------------------------


function ObradiScore(podaci,vrstaScore,intenzitetScore) {
  if(podaci) {
      let pom = state[vrstaScore.toLowerCase()];
      //console.log("POMOCNA",pom);
      //console.log("VRSTA I INT",vrstaScore,intenzitetScore);
      //console.log("PODACIIIII",podaci);
      let novi = podaci.filter(uslovScore,{vrstaScore,intenzitetScore,pom});
      //console.log("NOVI",novi);
      return novi;
  }

}

function ObradiDrogu(podaci,ucestalost,droga) {
  if(podaci) {
    //console.log(ucestalost,droga);
    let novi = podaci.filter(uslovDroga,{ucestalost,droga});
  return novi;
  }
}

function ObradiGender(podaci,spol) {
  if(podaci) {
    let novi = podaci.filter(uslovSpol,spol);
  return novi;
  }
}

function ObradiEtnicitet(podaci,etnicitet) {
  if(podaci) {
    let novi = podaci.filter(uslovEtnicitet,etnicitet);
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


//------------------------------ L A B E L E ----------------------------------



function godLabele(){
  return  ["18-24","25-34","35-44","45-54","55-64","65+"]
}

function genderLabele(){
  return  ["Female","Male"]
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

function etnicityLabele(){
  return  [ "Asian","Black","Mixed-Black/Asian","Mixed-White/Asian", "Mixed-White/Black", "White","Other"]
}

function scoreLabele(scoreType){
  let povratni = state[scoreType.toLowerCase()].map(element => {return element[scoreType];});
  return  povratni;
}

//------------------------------- C O U N T O V I -------------------------------



function CountGodine(podaci,godine) {
  var novi = ObradiGodine(podaci,godine);
  return novi.length;
}

function CountGender(podaci,gender) {
  var novi = ObradiGender(podaci,gender);
  return novi.length;
}

function CountDrogu(podaci,ucestalost,droga) {
  return ObradiDrogu(podaci,ucestalost,droga).length;
}


function CountEducation(podaci,education) {
  return ObradiSpol(podaci,education).length;
}

function CountEthnicity (podaci,etnicity) {
  return ObradiEtnicitet(podaci,etnicity).length;
}

function CountScore (podaci,scoreType, scoreI) {
  return ObradiScore(podaci,scoreType,scoreI).length;
}


//-----------------------------------  C H A R T O V I ---------------------------------------

function napraviLineChart(dataf, labesf)  {
    var canvas1 = document.getElementById("canvas-1");
    var canvas2 = document.getElementById("canvas-2");
    var canvas3 = document.getElementById("canvas-3");
    canvas1.style.display = "block";
    canvas2.style.display = "none";
    canvas3.style.display = "none";

    const lineChart = new Chart($('#canvas-1'), {
        type: 'line',
        data: {
          labels: labesf,
          //labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets : [
            {
              label: 'My First dataset',
              backgroundColor : 'rgba(220, 220, 220, 0.2)',
              borderColor : 'rgba(220, 220, 220, 1)',
              pointBackgroundColor : 'rgba(220, 220, 220, 1)',
              pointBorderColor : '#fff',
              data : dataf,
            },
          ]
        },
        options: {
          responsive: true
        }
      })
}

function napraviBarChart(dataf,labelsf) {


    var canvas1 = document.getElementById("canvas-1");
    var canvas2 = document.getElementById("canvas-2");
    var canvas3 = document.getElementById("canvas-3");
    canvas1.style.display = "none";
    canvas2.style.display = "block";
    canvas3.style.display = "none";

    const barChart = new Chart($('#canvas-2'), {
      type: 'bar',
      data: {
        labels : labelsf,
        datasets : [
          {
            backgroundColor : 'rgba(220, 220, 220, 0.5)',
            borderColor : 'rgba(220, 220, 220, 0.8)',
            highlightFill: 'rgba(220, 220, 220, 0.75)',
            highlightStroke: 'rgba(220, 220, 220, 1)',
            data : dataf
          }
        ]
      },
      options: {
        responsive: true
      }
    })
}

function napraviDoughnutChart(dataf,labelsf) {
  Inicijaliziraj().then(result => {

    // eslint-disable-next-line no-unused-vars
    var canvas1 = document.getElementById("canvas-1");
    var canvas2 = document.getElementById("canvas-2");
    var canvas3 = document.getElementById("canvas-3");
    canvas1.style.display = "none";
    canvas2.style.display = "none";
    canvas3.style.display = "block";

    const doughnutChart = new Chart($('#canvas-3'), {
      type: 'doughnut',
      data: {
        labels: labelsf,
        datasets: [{
          data: dataf,
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


//-----------------------------  o b r a d a    p o d a t a k a ---------------------------------


function finalizirajPodatke(podaciF) {
  let vrati={data:[],label:[]};
  //console.log("PODACIFFF",podaciF);
  let podaci = state.podaci;
  //let podaci = await Inicijaliziraj();//
    //console.log("PODACI",podaci)

    
      if(podaciF.ages != null && podaciF.ages.length>0) {
        podaciF.ages.forEach(element =>{
          vrati.data=vrati.data.concat( ObradiGodine(podaci,element));
        });
        podaci=vrati.data;
      }

      if(podaciF.genders != null && podaciF.genders.length>0) {
        vrati.data = [];
        podaciF.genders.forEach(element =>{
          vrati.data=vrati.data.concat( ObradiGender(podaci,element));
        });
        podaci=vrati.data;
      }

      if(podaciF.educations != null  && podaciF.educations.length>0) {
        vrati.data = [];
        podaciF.educations.forEach(element =>{
          vrati.data=vrati.data.concat( ObradiEdukaciju(podaci,element));
        });
        podaci=vrati.data;
      }

      if(podaciF.ethnicitys != null  && podaciF.ethnicitys.length>0) {
        vrati.data = [];
        podaciF.ethnicitys.forEach(element =>{
          vrati.data=vrati.data.concat( ObradiEtnicitet(podaci,element));
        });
        podaci=vrati.data;
      }

      if(podaciF.nscore != null  && podaciF.nscore!="") {
        vrati.data = [];
        vrati.data = ObradiScore(podaci,"Nscore",podaciF.nscore);
        podaci=vrati.data;
      }

      if(podaciF.escore != null  && podaciF.escore!="") {
        vrati.data = [];
        vrati.data = ObradiScore(podaci,"Escore",podaciF.escore);
        podaci=vrati.data;
      }

      if(podaciF.cscore != null  && podaciF.cscore!="") {
        vrati.data = [];
        vrati.data = ObradiScore(podaci,"Cscore",podaciF.cscore)
        podaci=vrati.data;
      }

      if(podaciF.oscore != null  && podaciF.oscore!="") {
        vrati.data = [];
        vrati.data = ObradiScore(podaci,"Oscore",podaciF.oscore)
        podaci=vrati.data;
      }

      if(podaciF.ascore != null  && podaciF.ascore!="") {
        vrati.data = [];
        vrati.data = ObradiScore(podaci,"Ascore",podaciF.ascore)
        podaci=vrati.data;
      }
      

      if(podaciF.drug !== "NONE" ) {
        //console.log("FINAL222",podaci);
        vrati.data = [];
        vrati.data = ObradiDrogu(podaci,podaciF.ucestalost,podaciF.drug);
        podaci=vrati.data;
      }

      //console.log("FINAL",vrati);
      return podaci;
}






function dobaviSPocetne() {
  var povratni={};
  var genders = Array.prototype.slice.call(document.getElementsByName("gender"));
  let genderVal = genders.filter(element => {return element.checked; }).map(el => {return el.value;});
  
  var ages = Array.prototype.slice.call(document.getElementsByName("godine"));
  let ageVal = ages.filter(element => {return element.checked; }).map(el => {return el.value;});
  
  var educations  = Array.prototype.slice.call(document.getElementsByName("education"));
  let educationVal = educations.filter(element => {return element.checked; }).map(el => {return el.value;});
  
  var ethnicitys  = Array.prototype.slice.call(document.getElementsByName("ethnicity"));
  let ethnicityVal = ethnicitys.filter(element => {return element.checked; }).map(el => {return el.value;});//console.log(element.name, element.checked, element.value)
  
  var ucestalosti = Array.prototype.slice.call(document.getElementsByName("ucestalost"));
  let ucestalostVal = ucestalosti.filter(element => {return element.checked; }).map(el => {return el.value;});

  var nscore  = document.getElementById("nscore").value;
  var escore  = document.getElementById("escore").value;
  var oscore  = document.getElementById("oscore").value;
  var ascore  = document.getElementById("ascore").value;
  var cscore  = document.getElementById("cscore").value;
  //var impulsiveness = document.getElementById("impulsiveness").value;
  //var ss  = document.getElementById("ss").value;


  
  povratni.genders = genderVal;
  povratni.ages = ageVal;
  povratni.educations = educationVal;
  povratni.ethnicitys = ethnicityVal;
  povratni.nscore = nscore;
  povratni.escore = escore;
  povratni.oscore = oscore;
  povratni.ascore = ascore;
  povratni.cscore = cscore;
  povratni.ucestalost = ucestalostVal[0];
  //povratni.impulsiveness = impulsiveness;
  //povratni.ss = ss;

  povratni.drug=state.drug;
  povratni.label=state.label;
  
  return povratni;
  //UcitajSS().then(rezultat => console.log(rezultat))
}

function selectDrug(droga2) {
  var x = document.getElementById("drogaDropdown");
  x.innerHTML = droga2;
  state.drug=droga2;

  if(droga2 != "NONE") document.getElementById("firstOne").checked=true;;
  
  
  //let genderVal = genders.filter(element => {return element.checked; }).map(el => {return el.value;});

}


function selectLabel(labela) {
  var x = document.getElementById("labelDropdown");
  x.innerHTML = labela;
  state.label=labela;
  //console.log(labela);
  if (labela == "Age") {
    state.labels = godLabele();
  }
  else if (labela == "Gender") {
    state.labels = genderLabele();
  }
  else if (labela == "Education") {
    state.labels = edukacijaLabele();
  }
  else if (labela == "Ethnicity") {
    state.labels = etnicityLabele();
  }
  else if (labela == "Drug") {
    state.labels = drugLabele();
  }
  else {
    state.labels = scoreLabele(labela);
  }

}


function napraviGrafF() {
  let pocetna=dobaviSPocetne()
  let data = finalizirajPodatke(pocetna);
  console.log("POCETNa",pocetna);
  console.log("DATA",data);
  let finDat=[];

  if(state.label=="Age")
  {
    finDat = state.labels.map(element => {return CountGodine(data,element);});
  }
    
  else if(state.label=="Gender")
    finDat = state.labels.map(element => {return CountGender(data,element);});
  else if(state.label=="Ethnicity")
    finDat = state.labels.map(element => {return CountEthnicity(data,element);});
  else if(state.label=="Education")
    finDat = state.labels.map(element => {return CountEducation(data,element);});
  else if(state.label=="Drug")
    finDat = state.labels.map(element => {return CountDrogu(data,element,pocetna.drug);});
  else
    finDat = state.labels.map(element => {return CountScore(data,state.label,element);});

  console.log("FINDATA",finDat);
  if(state.label=="Age" || state.label=="Education")
    napraviLineChart(finDat,state.labels);
  else if(state.label=="Gender" || state.label=="Ethnicity")
    napraviDoughnutChart(finDat,state.labels)
  else 
    napraviBarChart(finDat,state.labels) 



}




