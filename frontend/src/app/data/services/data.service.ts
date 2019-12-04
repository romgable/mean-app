import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Constants} from 'src/app/core/services/constants.service';
import {Data} from '../models/data.model';
import {map} from 'rxjs/operators';
import {Observable, EMPTY} from 'rxjs';

@Injectable()
export class DataService {
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private constants: Constants) {
    this.httpHeaders = constants.defaultHttpHeaders();
  }

  getAll(): Observable<Data[]> {
    return this.http
      .get<Data[]>(`${this.constants.baseUrl}/data`, {
        headers: this.httpHeaders
      })
      .pipe(
        map((res: Data[]) => {
          return res;
        })
      );
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<Data>(`${this.constants.baseUrl}/data/${id}`, {
        headers: this.httpHeaders
      })
      .pipe(
        map(() => {
          return EMPTY;
        })
      );
  }
}
