import { formatDate } from '@angular/common';
export class reservationChambre {
    id: number;
    nom: string;
    prenom : string
    nom_chambre: string;
    date_arrive: string;
    date_depart: string;
    nbre_adultes: number;
    nbre_enfants: number;
    extras : string ; 
    commentaire : string;

    constructor(reservationChambre) {
        {
            this.id = reservationChambre.id || this.getRandomID();
            this.nom = reservationChambre.nom || '';
            this.prenom = reservationChambre.prenom || '';
            this.nom_chambre = reservationChambre.nom_chambre || '';
            this.date_arrive = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
            this.date_depart = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
            this.nbre_adultes = reservationChambre.nbre_adultes || 1;
            this.nbre_enfants = reservationChambre.nbre_enfants || 0;
            this.extras = reservationChambre.extras || '';
            this.commentaire = reservationChambre.commentaire || '';
        }
    }
    public getRandomID(): string {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
    }
}