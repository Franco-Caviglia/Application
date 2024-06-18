import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { SharedDataService } from '../../services/components/shared-data.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { PlantService } from '../../services/components/plant.service';
import { Plant } from '../model/plant';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPlantComponent } from './add-plant/add-plant.component';
import Swal from 'sweetalert2';
import { EditPlantComponent } from './edit-plant/edit-plant.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-global-monitor',
  standalone: true,
  imports: [
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './global-monitor.component.html',
  styleUrl: './global-monitor.component.css',
})
export class GlobalMonitorComponent implements OnInit {
  private header = inject(SharedDataService);

  plants: WritableSignal<Plant[]> = signal<Plant[]>([]);
  readings: WritableSignal<number> = signal<number>(0);
  avgAlerts: WritableSignal<number> = signal<number>(0);
  redAlerts: WritableSignal<number> = signal<number>(0);
  disabledSensors: WritableSignal<number> = signal<number>(0);

  public displayedColumns: string[] = [
    'country',
    'plantName',
    'readings',
    'avgAlerts',
    'redAlerts',
    'actions',
  ];

  constructor(private plantService: PlantService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPlants();
    this.header.sharedData.set('Monitoreo Global');
  }
  sumReadings: number = 0;
  sumAvgAlerts: number = 0;
  sumRedAlerts: number = 0;
  sumDisabledSensors: number = 0;

  getPlants() {
    this.sumReadings = 0;
    this.sumAvgAlerts = 0;
    this.sumRedAlerts = 0;
    this.sumDisabledSensors = 0;
    this.plantService.getPlants().subscribe((data) => {
      this.plants.set(data);

      for (let plant of data) {
        this.sumReadings = Number(this.sumReadings + Number(plant.readings));
        this.sumDisabledSensors = Number(
          this.sumDisabledSensors + Number(plant.disabledSensors)
        );
        this.sumAvgAlerts = Number(this.sumAvgAlerts + Number(plant.avgAlerts));
        this.sumRedAlerts = Number(this.sumRedAlerts + Number(plant.redAlerts));
      }
      this.readings.set(this.sumReadings);
      this.avgAlerts.set(this.sumAvgAlerts);
      this.disabledSensors.set(this.sumDisabledSensors);
      this.redAlerts.set(this.sumRedAlerts);
    });
  }

  newPlant() {
    const dialogRef = this.dialog.open(AddPlantComponent, {
      width: '380px',
      height: '290px',
    });

    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      this.getPlants();
    });
  }

  editPlant(plantId: number) {
    const dialogRef = this.dialog.open(EditPlantComponent, {
      width: '720px',
      height: '450px',
      data: {
        plantId: plantId,
      },
    });

    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      this.getPlants();
    });
  }

  deletePlant(plantId: number) {
    this.plantService.delPlant(plantId).subscribe((response) => {
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

      this.getPlants();
    });
  }
}
