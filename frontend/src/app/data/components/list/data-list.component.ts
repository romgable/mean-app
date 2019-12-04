import {Component, OnInit, OnDestroy} from '@angular/core';
import {Data} from '../../models/data.model';
import {DataService} from '../../services/data.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit, OnDestroy {
  items: Data[];
  datasource: MatTableDataSource<Data>;
  displayedColumns: string[] = [
    'date',
    'message'
  ];

  private unsubscribe$ = new Subject();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items: Data[]) => {
        this.items = items;
        this.datasource = new MatTableDataSource(items);
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  deleteItem(item: Data) {
    this.dataService
      .delete(item._id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.items = this.items.filter(i => i._id !== item._id);
        this.datasource = new MatTableDataSource(this.items);
      });
  }
}
