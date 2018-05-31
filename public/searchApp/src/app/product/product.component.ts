import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() inputData: any;
  data: any
  constructor() {

  }

  ngOnInit() {
    this.data = this.inputData;
 }
  ngOnChanges(){
  }

}
