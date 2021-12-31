import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';


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

  receiptTable = {
    recieptNo: 2525,
    deptName: 'YASHVANTRAO CHAVAN SCHOOL OF RURAL DEVELOPMENT',
    receiptDate: '04/02/2021',
    receivedFrom: 'PAWALE ANUJA RAJARAM',
    depositInAC: "A/c - 1 UCO Bank Shivaji University",
    modeOfInstall: 'By Cash',
    depositRecNo: 1234,
    depositDate: "04/02/2021",
    bankname: 'VIDYANAGAR',
    manualRecNo: '',
    examination: 'MCA I',
    monthYear: ' March 2021',
    datatable: [{ 'SrNo': 1, 'Particular': 'Admission Fee', 'Budget': '	A.67.R.6', 'Amount': 20.00 }],
    totalAmount: 6500,
    LetterAmount: "Rupees SIX THOUSAND FIVE HUNDRED ONLY",
    contactNo: 9090909090,
  }

  applicationID

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    this.applicationID = history.state;

  }
  originalContents
  printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    this.originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = this.originalContents;

  }

  title = 'htmltopdf';

  @ViewChild('printableArea') printableArea: ElementRef;

  public downloadAsPDF() {
    const doc = new jsPDF();

    const printableArea = this.printableArea.nativeElement;

    // var html = htmlToPdfmake(printableArea.innerHTML);
    var html = htmlToPdfmake(printableArea.document.body.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }



}
