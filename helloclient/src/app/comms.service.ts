import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CommsService {

  url = ''

  constructor(
    private httpClient:HttpClient
  ) {
    this.url = environment.serverUrl
    console.log('comms.service Initialized')
  }

  loadIngredients() {
    return this.httpClient.get(this.url)
  }

  saveIngredient(data) {
    return this.httpClient.post(this.url, data)
  }

  updateIngredient(id,data) {
    return this.httpClient.put(`${this.url}/${id}`,data)
  }

  deleteIngredient(id) {
    return this.httpClient.delete(`${this.url}/${id}`)
  }


}
