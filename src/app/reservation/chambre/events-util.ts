import { EventInput } from "@fullcalendar/angular";

const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: "event1",
    title: "Colony",
    start: '2021-09-24T14:30:00',
    end: '2021-09-25T12:30:00',
    backgroundColor : "#FFA500",
    displayEventTime:false, 
    allDay : false,
    category: "#FFA500",
    groupId : "Colony",
    borderColor: "#FFA500",
    extendedProps : {
      nom : "Ahmed", 
      prenom :"kilani" , 
      nom_chambre :"Colony" ,
      nbre_adultes :"2" ,
      nbre_enfants :"1" ,
      extras :"test extras" ,
      commentaire :"test commentaire" ,
    }
  },
  {
    id: "event2",
    title: "Bonelhi",
    start: '2021-09-22T14:30:00',
    end: '2021-09-23T12:30:00',
    backgroundColor : "#87CEEB",
    borderColor:  "#87CEEB",
    displayEventTime:false, 
    allDay : false,
    category: "#87CEEB",
    groupId : "Bonelhi" ,
    extendedProps : {
      nom : "Mohamed", 
      prenom :"Zouari" , 
      nom_chambre :"Bonelhi" ,
      nbre_adultes :"1" ,
      nbre_enfants :"0" ,
      extras :"test extras" ,
      commentaire :"test commentaire" ,
    }
  },
  {
    id: "event3",
    title: "Marabon",
    start: '2021-09-17T14:30:00',
    end: '2021-09-19T12:30:00',
    backgroundColor : "#0000FF",
    borderColor: "#0000FF",
    displayEventTime:false, 
    allDay : false,
    category: "#0000FF",
    groupId : "Marabon" ,
    extendedProps : {
      nom : "Houda", 
      prenom :"Mabrouk" , 
      nom_chambre :"Marabon" ,
      nbre_adultes :"2" ,
      nbre_enfants :"2" ,
      extras :"test extras" ,
      commentaire :"test commentaire" ,
    }
  },
  {
    id: "event4",
    title: "Brecoir",
    start: '2021-09-29T14:30:00',
    end: '2021-09-30T12:30:00',
    backgroundColor : "#ff0000",
    borderColor: "#ff0000",
    displayEventTime:false, 
    allDay : false,
    category: "#ff0000",
    groupId : "Brecoir" ,
    extendedProps : {
      nom : "rime", 
      prenom :"jiyed" , 
      nom_chambre :"Brecoir" ,
      nbre_adultes :"1" ,
      nbre_enfants :"0" ,
      extras :"test extras" ,
      commentaire :"test commentaire" ,
    }
  },
  {
    id: "event5",
    title: "Ciconia",
    start: '2021-09-10T14:30:00',
    end: '2021-09-13T12:30:00',
    backgroundColor : "#964B00",
    borderColor:"#964B00",
    displayEventTime:false,
    allDay : false, 
    category: "#964B00",
    groupId : "Ciconia" ,
    extendedProps : {
      nom : "Jiyed", 
      prenom :"Ahmed" , 
      nom_chambre :"Ciconia" ,
      nbre_adultes :"2" ,
      nbre_enfants :"1" ,
      extras :"test extras" ,
      commentaire :"test commentaire" ,
    }
  },
  {
    id: "event6",
    title: "Amorpha",
    start: '2021-09-20T14:30:00',
    end: '2021-09-21T12:30:00',
    backgroundColor : "#FFC0CB",
    borderColor:  "#FFC0CB",
    displayEventTime:false, 
    allDay : false,
    category: "#FFC0CB",
    groupId : "Amorpha" ,
    extendedProps : {
      nom : "Ahmed", 
      prenom :"kilani2.0" , 
      nom_chambre :"Amorpha" ,
      nbre_adultes :"2" ,
      nbre_enfants :"0" ,
      extras :"test extras" ,
      commentaire :"test commentaire" ,
    }
  },
  {
    id: "event7",
    title: "Ruppia",
    start: '2021-09-18T14:30:00',
    end: '2021-09-20T12:30:00',
    backgroundColor : "#8F00FF",
    borderColor: "#8F00FF",
    displayEventTime:false, 
    allDay : false,
    category: "#8F00FF",
    groupId : "Ruppia" ,
    extendedProps : {
      nom : "Khawla", 
      prenom :"sebyi" , 
      nom_chambre :"Ruppia" ,
      nbre_adultes :"1" ,
      nbre_enfants :"0" ,
      extras :"test extras" ,
      commentaire :"test commentaire" ,
    }
  }
];
