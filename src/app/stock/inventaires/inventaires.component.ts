import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { InventaireService } from "src/app/core/service/inventaire.service";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-inventaires",
  templateUrl: "./inventaires.component.html",
  styleUrls: ["./inventaires.component.scss"],
})
export class InventairesComponent implements OnInit {
  inventaires = [];
  showFilters = false;
  filterForm: FormGroup;
  page = 1;

  constructor(
    public readonly inventaireService: InventaireService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getInventairesAction()
    this.filterForm = this.createFilterForm();
  }

  createFilterForm(): FormGroup {
    return this.fb.group({
      from: [""],
      to: [""],
      person: [""],
      label: [""]
    });
  }

  showFiltersAction = () => {
    this.showFilters = !this.showFilters;
  }

  getInventairesAction = () => {
    this.inventaireService.getInventaires().subscribe(
      (res) => {
        console.log("res>>>>", res);
        
        if (res.length) {
          this.inventaires = res;
        } else {
          this.inventaires = [];
        }
        console.log(this.inventaires);
      },
      (error) => {
        console.log("getInventairesAction error", error);
      }
    );
  };


  
  getInventaireAction = (id: string) => {
    this.inventaireService.getInventaire(id).subscribe(
      (res) => {
        if (res) {
        } else {
        }
        console.log(res);
      },
      (error) => {
        console.log("getInventaireAction error", error);
      }
    );
  };

  addInventaireAction = () => {
    const inventaire = {
      date: new Date(),
      articleList: [],
      clientID: null,
    };
    this.inventaireService.addInventaire(inventaire).subscribe(
      (res) => {
        if (res) {
          console.log(res);
          return res;
        } else {
          return null;
        }
      },
      (error) => {
        console.log("addInventaireAction error", error);
      }
    );
  };

  removeInventaireAction = (id: string) => {
    this.inventaireService.removeInventaire(id).subscribe(
      (res) => {
        if (res) {
        } else {
        }
        console.log(res);
      },
      (error) => {
        console.log("removeInventaireAction error", error);
      }
    );
  };
  updateInventaireAction = (id: string) => {
    const inventaire = {
      date: new Date(),
      articleList: [],
      clientID: null,
    };
    this.inventaireService.updateInventaire(id, inventaire).subscribe(
      (res) => {
        if (res) {
        } else {
        }
        console.log(res);
      },
      (error) => {
        console.log("removeInventaireAction error", error);
      }
    );
  };
}