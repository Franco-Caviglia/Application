import {
  Component,
  Inject,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlantService } from '../../../services/components/plant.service';
import { Plant } from '../../model/plant';
import Swal from 'sweetalert2';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-plant',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-plant.component.html',
  styleUrl: './edit-plant.component.css',
})
export class EditPlantComponent implements OnInit {
  plantInfo: WritableSignal<Plant> = signal<Plant>(new Plant());

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { plantId: number },
    private plantService: PlantService,
    public dialogRef: MatDialogRef<EditPlantComponent>
  ) {}

  ngOnInit(): void {
    this.getPlantInfo();
  }

  getPlantInfo() {
    this.plantService.getPlantInfo(this.data.plantId).subscribe((data) => {
      this.plantInfo.set(data);
    });
  }

  editPlant() {
    this.plantInfo().avgAlerts = Number(this.plantInfo().avgAlerts);
    this.plantInfo().readings = Number(this.plantInfo().readings);
    this.plantInfo().redAlerts = Number(this.plantInfo().redAlerts);
    this.plantInfo().disabledSensors = Number(this.plantInfo().disabledSensors);

    this.plantService
      .editPlant(this.data.plantId, this.plantInfo())
      .subscribe((response) => {
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

        this.getPlantInfo();
      });
  }

  closeInfo() {
    this.dialogRef.close();
  }
}
