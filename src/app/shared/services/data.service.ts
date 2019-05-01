import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericApiService {

  constructor(private http: HttpClient, private url: string) 
  { 
  }

  getAll()
  {
    return this.http.get(this.url);
  }

  get(id: string)
  {
    return this.http.get(this.url + '/' + id);
  }

  add(postData: any) 
  {
    return this.http.post(this.url, postData, {observe: 'response'});
  }

  update(id: any, formData)
  {
    return this.http.put(this.url + '/' + id, formData);
  }

  delete(id: string)
  {
    return this.http.delete(this.url + '/' + id);
  }
}
