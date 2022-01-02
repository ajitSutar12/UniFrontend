import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ReceiptService } from './receipt.service'

// import { NgxNumToWordsService, SUPPORTED_LANGUAGE } from 'ngx-num-to-words';
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

  numberInWords!: string;
  // lang: SUPPORTED_LANGUAGE = 'en';
  value = 123;

  receiptTable = { //main
    recieptNo: 2525,
    deptName: 'YASHVANTRAO CHAVAN SCHOOL OF RURAL DEVELOPMENT', //DEPT_NAME
    receiptDate: '04/02/2021',
    receivedFrom: 'PAWALE ANUJA RAJARAM',   //PAID_BY
    depositInAC: "A/c - 1 UCO Bank Shivaji University",
    modeOfInstall: 'By Cash',
    depositRecNo: 1234,
    depositDate: "04/02/2021",
    bankname: 'VIDYANAGAR',
    manualRecNo: '1234',
    examination: 'MCA I',
    monthYear: ' March 2021',
    datatable: [ //particular
      {
        'SrNo': 1, //SR_NO
        'Particular': 'Admission Fee', //PARTICULARS
        'Budget': '	A.67.R.6',  //BUDGET_CODE
        'Amount': 20.00 //AMOUNT
      }],
    totalAmount: 6500, //TRAN_AMT
    LetterAmount: "Rupees SIX THOUSAND FIVE HUNDRED ONLY",
    contactNo: 9090909090,
  }

  applicationID

  constructor(private fb: FormBuilder, private router: Router, private _recepit: ReceiptService,
    // private ngxNumToWordsService: NgxNumToWordsService
    ) {
    console.log(this.router.getCurrentNavigation().extras.state);
    this.applicationID = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {
    // this.applicationID = history.state;

    console.log('applicationID', this.applicationID)
    // this._recepit.getReceiptData(this.applicationID).subscribe(data => {
    //   console.log('receipt data', data)
    //   // this.receiptTable = data
    // })
    // this.numberInWords = this.ngxNumToWordsService.inWords(this.value, this.lang)
    // console.log('numberInWords', this.numberInWords)

    this._recepit.getReceiptData(this.applicationID).subscribe(data => {
      console.log('receipt', data)
      this.receiptTable['deptName'] = data.main[0].DEPT_NAME
      this.receiptTable['receivedFrom'] = data.main[0].PAID_BY
      this.receiptTable['datatable'] = data.particular

    })
  }

  printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;

  }

  title = 'htmltopdf';

  @ViewChild('printableArea') printableArea: ElementRef;

  public downloadAsPDF(divName) {
    debugger
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
