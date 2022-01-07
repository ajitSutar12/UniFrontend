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
    recieptNo: 2525,
    deptName: 'YASHVANTRAO CHAVAN SCHOOL OF RURAL DEVELOPMENT', //DEPT_NAME
    Purpose_Name: '',
    // receiptDate: '04/02/2021',
    receiptDate: '',
    receivedFrom: 'PAWALE ANUJA RAJARAM',   //PAID_BY
    // depositInAC: "A/c - 1 UCO Bank Shivaji University",
    depositInAC: "",
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
      {
        'SrNo': 1, //SR_NO
        'Particular': 'Admission Fee', //PARTICULARS
        'Budget': '	A.67.R.6',  //BUDGET_CODE
        'Amount': 20.00 //AMOUNT
      }],
    totalAmount: 6500, //TRAN_AMT
    LetterAmount: "Rupees SIX THOUSAND FIVE HUNDRED ONLY",
    // contactNo: 9090909090,
    contactNo: '',
  }

  applicationID

  constructor(private fb: FormBuilder, private router: Router, private _recepit: ReceiptService,
    private ngxNumToWordsService: NgxNumToWordsService
  ) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.applicationID = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    // this.applicationID = history.state;

    console.log('applicationID', this.applicationID)
    this.applicationID += ''
    let temp = "123456789"
    let receno = this.applicationID.substring(this.applicationID.length - 7)
    receno = receno.replace(/^0+/, '')

    var str = "20220104";

    this._recepit.getReceiptData(this.applicationID).subscribe(data => {
      console.log('receipt', data)
      console.log("tran date", str.substring(6, 8) + "/" + str.substring(4, 6) + "/" + str.substring(0, 4))
      this.numberInWords = this.ngxNumToWordsService.inWords(data.main[0].TRAN_AMT, this.lang)
      this.receiptTable['recieptNo'] = receno.replace(/^0+/, '')
      // this.receiptTable['deptName'] = data.main[0].DEPT_NAME
      this.receiptTable['receivedFrom'] = data.main[0].PAID_BY
      this.receiptTable['totalAmount'] = data.main[0].TRAN_AMT
      this.receiptTable['receiptDate'] = data.main[0].TRAN_DATE.substring(6, 8) + "/" + data.main[0].TRAN_DATE.substring(4, 6) + "/" + data.main[0].TRAN_DATE.substring(0, 4)
      // this.receiptTable['examination'] = data.main[0].EXAM_NAME
      this.receiptTable['deptName'] = data.main[0].Dept_Name
      this.receiptTable['Purpose_Name'] = data.main[0].Purpose_Name
      this.receiptTable['depositInAC'] = data.main[0].Deposit_ACNAME
      // this.receiptTable['monthYear'] = data.main[0].EXAM_MONTH + " " + data.main[0].EXAM_YEAR
      this.receiptTable['datatable'] = data.particular
      this.receiptTable['LetterAmount'] = this.numberInWords.toUpperCase()
    })
  }

  printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    var printButton = document.getElementById("printButton");
    printButton.style.visibility = 'hidden';
    window.print();
    printButton.style.visibility = 'visible';
    document.body.innerHTML = originalContents;
    this._recepit.updateData(this.applicationID)
  }

  title = 'htmltopdf';

  @ViewChild('printableArea') printableArea: ElementRef;

  public downloadAsPDF(divName) {
    const doc = new jsPDF();

    const printableArea = document.getElementById(divName).innerHTML;

    // const printableArea = this.printableArea.nativeElement;

    // var html = htmlToPdfmake(printableArea.innerHTML);
    var html = htmlToPdfmake(printableArea);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();
    console.log('documentDefinition', documentDefinition)

  }



}
