import { Component, OnInit } from '@angular/core';
import { CommsService } from '../comms.service'
import { empty } from 'rxjs';

interface iIngredient {
  // Interfaces allow you to define a data structure
  _id?: string,  // <-- the "?" notation means this property is an "optional" property
  ingredient: string,
  uom?: string,
  amount?: number
}

@Component({
  selector: 'app-listingredients',
  templateUrl: './listingredients.component.html',
  styleUrls: ['./listingredients.component.css']
})
export class ListingredientsComponent implements OnInit {

  allIngredients = []
  formData:iIngredient
  showEdit = false

  constructor(
    private comms:CommsService
  ) { }

  ngOnInit() {
    this.loadData()
    this.resetFormData()
  }

  loadData() {
    this.comms.loadIngredients().subscribe(alldata=>{
      this.allIngredients = alldata['data']
    })
  }

  edit(data) {
    this.formData = data
    this.showEdit = true
  }

  addnew() {
    this.showEdit = true
    this.resetFormData()
  }

  delete(data:iIngredient) {
    if (confirm(`Are you sure you want to delete ${data.ingredient}`)) {
      this.comms.deleteIngredient(data._id).subscribe(result=>{
        this.loadData()
      }, err=>{
        console.error(err)
      })
    }

  }

  confirmForm() {
    console.log(this.formData)
    let formData:iIngredient = this.formData // < pass the formData into an interfaced variable, this will check it's validity
    if (formData._id != null) {
      // this is an existing data, we should use the UPDATE function
      console.log('updating data')
      this.comms.updateIngredient(this.formData['_id'], this.formData).subscribe(result=>{
        this.loadData()
        this.resetFormData()
        this.showEdit=false
      }, err=>{
        console.error(err)
      })
    } else {
      // this is a NEW data because there is no ID, we should attempt the CREATE function
      console.log('saving new data')
      this.comms.saveIngredient(this.formData).subscribe(result=>{
        // no error returned
        this.loadData()
        this.resetFormData()
        this.showEdit = false
      }, err=>{
        console.error(err)
      })
    }
  }

  cancelForm() {
    this.showEdit = false
    this.resetFormData()
  }

  resetFormData() {
    this.formData = {
      _id:null,
      ingredient:null,
      uom:null,
      amount:null
    }
  }

}
