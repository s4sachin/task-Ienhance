import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './service/data-service.service';
import { DataInterface } from './interface/data';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<DataInterface>();
  csvRecords: DataInterface[] = [];
  results: any;
  displayedColumns: string[] = ['policyID', 'statecode', 'county', 'sum'];
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.onGetTableData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onGetTableData() {
    this.dataService
      .getTableData()
      .pipe()
      .subscribe((response: string | any) => {
        let lines = response.split('\n');
        // console.log('Lines value is: ' + lines);
        let headers = lines[0].split(',');
        // console.log('headers value is: ' + headers);
        let results: any[] = [];
        for (let i = 1; i < lines.length; i++) {
          let line = lines[i];
          let row: { [index: string]: DataInterface } = {};
          line.split(',').forEach((item: any, idx: number) => {
            row[headers[idx]] = item;
          });
          results.push(row);
        }
        this.csvRecords = results;
        this.dataSource.data = this.csvRecords;
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
