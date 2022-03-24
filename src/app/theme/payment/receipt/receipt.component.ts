import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ReceiptService } from './receipt.service'
import { NgxNumToWordsService, SUPPORTED_LANGUAGE } from 'ngx-num-to-words';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import * as moment from 'moment';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  // Created Form Group
  angForm: FormGroup;

  numberInWords: string;
  lang: SUPPORTED_LANGUAGE = 'en';
  value = 123;

  receiptTable = { //main
    recieptNo: 0,
    deptName: '', //DEPT_NAME
    Purpose_Name: '',
    // receiptDate: '04/02/2021',
    receiptDate: '',
    receivedFrom: '',   //PAID_BY
    // depositInAC: "A/c - 1 UCO Bank Shivaji University",
    depositInAC: "",
    UTR_NO: "",
    // modeOfInstall: 'By Cash',
    modeOfInstall: '',
    // depositRecNo: 1234,
    depositRecNo: '',
    // depositDate: "04/02/2021",
    depositDate: "",
    // bankname: 'VIDYANAGAR',
    bankname: '',
    // manualRecNo: '1234',
    manualRecNo: '',
    // examination: 'MCA I',
    examination: '',
    // monthYear: 'March 2021',
    monthYear: '',
    datatable: [ //particular
      // {
      //   'SrNo': 0, //SR_NO
      //   'Particular': '', //PARTICULARS
      //   'Budget': '	',  //BUDGET_CODE
      //   'Amount': 0 //AMOUNT
      // }
    ],
    totalAmount: 0, //TRAN_AMT
    LetterAmount: "",
    // contactNo: 9090909090,
    contactNo: '',
    date: '',
    userId: ''
  }

  applicationID: any = 0
  isDept: boolean = true

  studUser: boolean = false
  clgUser: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private _recepit: ReceiptService,
    private ngxNumToWordsService: NgxNumToWordsService
  ) {
    this.applicationID = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    // this.applicationID = history.state;
    this.applicationID += ''
    let temp = "123456789"
    // let receno = this.applicationID.substring(this.applicationID.length - 7)
    // receno = receno.replace(/^0+/, '')

    var str = "20220104";
    var userData = JSON.parse(localStorage.getItem('user'));
    let userType = userData.USER_TYPE
    userType == 0 ? this.studUser = true : this.studUser = false
    userType == 1 ? this.clgUser = true : this.clgUser = false

    this._recepit.getReceiptData(this.applicationID).subscribe(data => {
      this.numberInWords = this.ngxNumToWordsService.inWords(data.main[0].TRAN_AMT, this.lang)
      data.main[0].TRAN_NO += ''
      let receno = data.main[0].TRAN_NO.substring(data.main[0].TRAN_NO.length - 7)
      receno = receno.replace(/^0+/, '')
      this.receiptTable['recieptNo'] = receno.replace(/^0+/, '')
      // this.receiptTable['deptName'] = data.main[0].DEPT_NAME
      this.receiptTable['receivedFrom'] = data.main[0].PAID_BY
      this.receiptTable['UTR_NO'] = data.main[0].EXT_REFNO
      this.receiptTable['totalAmount'] = data.main[0].TRAN_AMT
      this.receiptTable['receiptDate'] = data.main[0].TRAN_DATE.substring(6, 8) + "/" + data.main[0].TRAN_DATE.substring(4, 6) + "/" + data.main[0].TRAN_DATE.substring(0, 4)
      // this.receiptTable['examination'] = data.main[0].EXAM_NAME
      this.receiptTable['deptName'] = data.main[0].Dept_Name == "" ? this.isDept = false : data.main[0].Dept_Name
      this.receiptTable['userId'] = data.main[0].userId
      this.receiptTable['Purpose_Name'] = data.main[0].Purpose_Name
      this.receiptTable['depositInAC'] = data.main[0].Deposit_ACNAME
      // this.receiptTable['monthYear'] = data.main[0].EXAM_MONTH + " " + data.main[0].EXAM_YEAR
      // this.receiptTable['datatable'] = data.particular

      this.receiptTable['LetterAmount'] = this.numberInWords.toUpperCase()

      data.particular.forEach(element => {
        if (element.AMOUNT != 0 && element.AMOUNT != null) {
          let srno = 1
          this.receiptTable['datatable'].push(element)
        }
      });

    })
    this.receiptTable['date'] = moment().format("YYYY-DD-MM hh:mm A")
  }

  printDiv(divName) {
    let print
    this._recepit.updateData(this.applicationID).subscribe(data => {
      print = data
    })
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    var printButton = document.getElementById("printButton");
    var backbutton = document.getElementById("backbutton");
    printButton.style.visibility = 'hidden';
    backbutton.style.visibility = 'hidden';
    window.print();
    printButton.style.visibility = 'visible';
    backbutton.style.visibility = 'visible';
    document.body.innerHTML = originalContents;
  }

  title = 'htmltopdf';

  @ViewChild('printableArea') printableArea: ElementRef;

  public downloadAsPDF(divName) {
    const doc = new jsPDF();
    const printableArea = document.getElementById(divName).innerHTML;
    var html = htmlToPdfmake(printableArea);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
  }
}
