import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})

export class ApiService {

  private apiUrl: string;
 
  constructor(private http: HttpClient) {
    // Set the API URL dynamically based on environment
    // this.apiUrl = '/shainkeydetails/createShainkeydetails';  // This will come from the environment file
    this.apiUrl = environment.serverUrl
   
  }

  // PostData(data : any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}`, data);
  // }
  PostData(endpoint : string, data: any): Observable<any> {
    const url = `${this.apiUrl}${endpoint}`;  // Combine base URL with endpoint
    return this.http.post(url, data);  // Make the HTTP POST request
  }

  GetData(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}${endpoint}`;  // Remove any trailing/leading slashes
    return this.http.get(url);  // Make the HTTP GET request
  }

  DeleteData(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}${endpoint}`;  // Remove any trailing/leading slashes
    return this.http.delete(url);  // Make the HTTP GET request
  }

  GetDataById(endpoint: string, id: number): Observable<any> {
    const url = `${this.apiUrl}${endpoint}/${id}`;  // Append the ID to the endpoint
    return this.http.get(url);  // Make the HTTP GET request
  }

  PutDataById(endpoint: string, id: number | number, data: any): Observable<any> {
    const url = `${this.apiUrl}${endpoint}/${id}`;  // Append the ID to the endpoint
    return this.http.put(url, data);  // Make the HTTP PUT request with the data in the body
  }
}