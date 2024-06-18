import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { merge } from 'rxjs';
import { Plant } from '../../model/plant';
import { PlantService } from '../../../services/components/plant.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

interface Country {
  name: string;
}

@Component({
  selector: 'app-add-plant',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './add-plant.component.html',
  styleUrl: './add-plant.component.css',
})
export class AddPlantComponent {
  countries: string[] = ['Ecuador', 'Argentina', 'Uruguay', 'Brasil', 'Chile'];

  plant: Plant = new Plant();

  errorMessage: string = '';
  plantName = new FormControl('', [Validators.required]);
  country = new FormControl('', [Validators.required]);

  constructor(
    private plantService: PlantService,
    public dialogRef: MatDialogRef<AddPlantComponent>
  ) {
    merge(
      this.plantName.statusChanges,
      this.plantName.valueChanges,
      this.country.statusChanges,
      this.country.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage(): void {
    if (this.country.hasError('required')) {
      this.errorMessage = 'El país es obligatorio';
    } else if (this.plantName.hasError('required')) {
      this.errorMessage = 'El nombre de la planta es requerido';
    }
  }

  addPlant(): void {
    if (this.plantName.value && this.country.value) {
      this.plant.plantName = this.plantName.value;
      this.plant.country = this.country.value;

      //Numbers hardcoded;
      this.plant.avgAlerts = 55;
      this.plant.readings = 250;
      this.plant.disabledSensors = 2;
      this.plant.redAlerts = 25;
    }

    this.plantService.addPlant(this.plant).subscribe((response) => {
      if (response.numOfErrors > 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          iconColor: 'red',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        (async () => {
          await Toast.fire({
            icon: 'warning',
            title: response.message,
          });
        })();
      }

      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        iconColor: 'green',
        customClass: {
          popup: 'colored-toast',
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      (async () => {
        await Toast.fire({
          icon: 'success',
          title: response.message,
        });
      })();

      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
