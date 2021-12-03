import { formatDate } from '@angular/common';

export class reservationMenu {
  id: number;
  nom: string;
  prenom: string;
  menu: string;
  nbr_personne: number;
  date_reservation: string;
  date_prevu: string;
  heure_prevu: string;
  nom_chambre: string;
  taarif: number;
  type_repas : string;
  status : string ;
  extras: string;
  commentaire: string;
  constructor(reservationMenu) {
    {
      this.id = reservationMenu.id || this.getRandomID();
      this.nom = reservationMenu.nom || '';
      this.prenom = reservationMenu.prenom || '';
      this.menu = reservationMenu.menu || '';
      this.nbr_personne = reservationMenu.nbr_personne || 1 ;
      this.date_reservation = formatDate(new Date(), 'yyyy-MM-dd', 'en') || formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.date_prevu = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.heure_prevu = reservationMenu.heure_prevu || '';
      this.nom_chambre = reservationMenu.nom_chambre || '';
      this.taarif = reservationMenu.taarif || 0;
      this.type_repas = reservationMenu.type_repas || '';
      this.status = reservationMenu.status || '';
      this.extras = reservationMenu.extras || '';
      this.commentaire = reservationMenu.commentaire || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
