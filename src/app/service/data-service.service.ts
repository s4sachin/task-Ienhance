import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataInterface } from '../interface/data';
import { env } from 'process';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // tried implementing gapi
  fileId?: string = env['csvFileId'];
  urlOAuth: string = 'https://www.googleapis.com/drive/v3/files/${fileId}';
  driveUrl: string =
    'https://drive.google.com/file/d/1FeAI_D3D_xlfZ__a7MFSCviBLrVc2jFk/view?usp=drivesdk';
  constructor(private http: HttpClient) {}

  getTableData(): Observable<DataInterface[]> {
    return this.http.get<DataInterface[]>(this.driveUrl, {
      responseType: 'text' as 'json',
    });
  }
  // https://drive.google.com/file/d/1OgWMG2yU0B091TIEJwaSYIW67AzsTW5U/view?usp=share_link
  // https://drive.google.com/file/d/1FeAI_D3D_xlfZ__a7MFSCviBLrVc2jFk/view?usp=drivesdk
}
