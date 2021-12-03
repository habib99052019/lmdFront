import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { reservationChambre } from '../chambre.model';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class ChambreFormDialogComponent {
  action: string;
  dialogTitle: string;
  reservationChambreForm: FormGroup;
  reservationChambre: reservationChambre;
  showDeleteBtn = false;
  Chambres = [{nom : "Delux", taarif : 120 } , {nom: "Super Delux" , taarif: 80} , { nom : "Vila" , taarif : 40} , {nom : "Single" , taarif : 150}]
  
  constructor(
    public dialogRef: MatDialogRef<ChambreFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.calendar.title;
      this.reservationChambre = data.reservationChambre;
      this.showDeleteBtn = true;
    } else {
      this.dialogTitle = 'New Event';
      this.reservationChambre = new reservationChambre({});
      this.showDeleteBtn = false;
    }

    this.reservationChambreForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.reservationChambre.id],
      nom: [
        this.reservationChambre.nom,
        [Validators.required]
      ],
      prenom: [
        this.reservationChambre.prenom,
        [Validators.required]
      ],
      nom_chambre: [
        this.reservationChambre.nom_chambre,
        [Validators.required]
      ],
      date_arrive: [
        this.reservationChambre.date_arrive,
        [Validators.required]
      ],
      date_depart: [
        this.reservationChambre.date_depart,
        [Validators.required]
      ],
      nbre_adultes: [
        this.reservationChambre.nbre_adultes,
        [Validators.required]
      ],
      nbre_enfants: [this.reservationChambre.nbre_enfants],
      extras: [this.reservationChambre.extras],
      commentaire: [this.reservationChambre.commentaire],
    });
  }
  submit() {
    // emppty stuff
  }
  deleteEvent() {
   
    this.dialogRef.close('delete');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
  
    this.dialogRef.close('submit');
  }
}
