import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'
import { Router } from '@angular/router'
// Displaying Sweet Alert
import Swal from 'sweetalert2';
@Component({
  selector: 'app-utilitydashboard',
  templateUrl: './utilitydashboard.component.html',
  styleUrls: ['./utilitydashboard.component.scss']
})
export class UtilitydashboardComponent implements OnInit {
  url = environment.base_url;
  files: any;
  file: File;
  arrayBuffer: any;
  filelist: any;
  buttonShow: boolean = true;
  showImg = true
  showUploadImg: boolean = false;
  fileUpload: any = null
  @ViewChild("myNameElem") myNameElem: ElementRef;
  constructor(private _service: DashboardService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  fileChoosing(ele: any) {
    if (ele.target.value) {
      this.files = <File>ele.target.files[0];
    }
  }

  uploadExcel() {
    let fd = new FormData();
    if (this.files) {
      fd.append('excelFile', this.files, this.files.name);
      this._service.utility(fd).subscribe(data => {

      })
    }
  }

  addfile(event) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      // console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
      var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.filelist = arraylist;
      // debugger
      // console.log(this.filelist)

    }

    this.buttonShow = false

  }

  // upload excel
  i = 0;
  count = 0;
  loopCount: number;
  sizelenght: number = 1;
  async SubmituploadedExcel() {
    // let count = this.filelist.length;
    // let counter = 0;
    this.showUploadImg = true;
    // this.filelist.forEach(async element => {
    //   await this._service.utility(element).subscribe(data => {
    //     counter = + 1;
    //     if (counter > count) {
    //       alert('Data upload Successfully');
    //       this.showUploadImg = false;
    //     }
    //   });
    // })
    console.log(this.filelist)
    Observable.from(this.filelist)
      .concatMap(entry => this.http.post<any>('http://localhost:4000/migrate/depotranshiv', entry))
      // .concatMap(entry => this.http.post<any>(this.url + '/registration/Utility', entry))
      .subscribe(
        response => console.log(response), //do something with responses
        error => console.error(error), // so something on error
        () => {
          console.info("All requests done")
          Swal.fire("Success!", "Data Updated Successfully !", "success");
          this.showUploadImg = false;
          this.buttonShow = true
          this.myNameElem.nativeElement.value = "";
          // document.getElementById('fileUpload').ariaValueText = '123';
        } // do something when all requests are done
      );
  }

  back() {
    this.router.navigateByUrl('/dashboard/Utility')
  }
}
