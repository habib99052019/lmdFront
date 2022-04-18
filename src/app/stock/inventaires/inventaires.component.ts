import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { InventaireService } from "src/app/core/service/inventaire.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-inventaires",
  templateUrl: "./inventaires.component.html",
  styleUrls: ["./inventaires.component.scss"],
})
export class InventairesComponent implements OnInit {
  inventaires = [];
  filteredList = [];
  showFilters = false;
  filterForm: FormGroup;
  page = 1;
  loading: boolean = true;
  config = {
    id: "custom",
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: 0,
  };
  constructor(
    public readonly inventaireService: InventaireService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getInventairesAction();
    this.filterForm = this.createFilterForm();
  }

  createFilterForm(): FormGroup {
    return this.fb.group({
      from: [""],
      to: [""],
      person: [""],
      label: [""],
    });
  }

  showFiltersAction = () => {
    this.showFilters = !this.showFilters;
  };

  getInventairesAction = () => {
    this.inventaireService.getInventaires().subscribe(
      (res) => {
        this.loading = false;
        if (res.length) {
          this.inventaires = res.reverse();
          console.log("inventaire malek>>>>", this.inventaires);
          
          this.filteredList = this.inventaires;
        } else {
          this.inventaires = [];
          this.filteredList = [];
        }
        console.log(this.inventaires);
      },
      (error) => {
        console.log("getInventairesAction error", error);
      }
    );
  };

  removeInventaireAction = (id: string) => {
    Swal.fire({
      title: "êtes vous sure?",
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#96a2b4",
      confirmButtonText: "Oui",
    }).then((result) => {
      if (result.value) {
        this.inventaireService.removeInventaire(id).subscribe(
          (res) => {
            if (res) {
              this.getInventairesAction();
            }
          },
          (error) => {
            console.log("removeInventaireAction error", error);
          }
        );
      }
    });
  };

  deepFilter() {
    const from = this.filterForm.get("from").value
      ? formatDate(this.filterForm.get("from").value, "yyyy-MM-dd", "en")
      : null;
    const to = this.filterForm.get("to").value
      ? formatDate(this.filterForm.get("to").value, "yyyy-MM-dd", "en")
      : null;
    const label = this.filterForm.get("label").value;
    const person = this.filterForm.get("person").value;

    this.filteredList = this.inventaires.filter((inventaire) => {
      const date = inventaire.date
        ? formatDate(inventaire.date, "yyyy-MM-dd", "en")
        : null;

      return (
        inventaire.clientID.first_name
          .trim()
          .toLowerCase()
          .includes(person.trim().toLowerCase()) &&
        inventaire.name.toLowerCase().includes(label.trim().toLowerCase()) &&
        (from && to
          ? date >= from && date <= to
          : from && !to
          ? date >= from
          : !from && to
          ? date <= to
          : true)
      );
    });
  }
}