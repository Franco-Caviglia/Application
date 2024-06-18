import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../components/model/plant';
import { environment } from '../../environments/environment';
import { ValidationResponse } from '../model/validationResponse';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private http: HttpClient) {}

  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${environment.urlAdminApi}/plants`);
  }

  addPlant(plant: Plant): Observable<ValidationResponse> {
    return this.http.post<ValidationResponse>(
      `${environment.urlAdminApi}/addPlant`,
      plant
    );
  }

  editPlant(plantId: number, plant: Plant): Observable<ValidationResponse> {
    return this.http.put<ValidationResponse>(
      `${environment.urlAdminApi}/${plantId}/editPlant`,
      plant
    );
  }

  delPlant(plantId: number): Observable<ValidationResponse> {
    return this.http.delete<ValidationResponse>(
      `${environment.urlAdminApi}/${plantId}/delPlant`
    );
  }

  getPlantInfo(plantId: number): Observable<Plant> {
    return this.http.get<Plant>(
      `${environment.urlAdminApi}/${plantId}/infoPlant`
    );
  }
}
