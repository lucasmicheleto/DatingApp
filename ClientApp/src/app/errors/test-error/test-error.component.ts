import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl = "https://localhost:7025";
  validationErrors: string[] = [];
  constructor(private httpClient: HttpClient) { }

  get404error() {
    return this.httpClient.get(this.baseUrl + "/api/buggy/not-found").subscribe({
      next: (res) => { console.log(res); },
      error: (error) => { console.log(error);  }
    });
  }

  get401error() {
    return this.httpClient.get(this.baseUrl + "/api/buggy/auth").subscribe({
      next: (res) => { console.log(res); },
      error: (error) => { console.log(error); }
    });
  }

  get500error() {
    return this.httpClient.get(this.baseUrl + "/api/buggy/server-error").subscribe({
      next: (res) => { console.log(res); },
      error: (error) => { console.log(error); }
    });
  }

  get400error() {
    return this.httpClient.get(this.baseUrl + "/api/buggy/bad-request").subscribe({
      next: (res) => { console.log(res); },
      error: (error) => { console.log(error); }
    });
  }

  get400Validationerror() {
    return this.httpClient.post<any>(this.baseUrl + "/api/account/register", { username: "", password: "" }).subscribe({
      next: (res) => { console.log(res); },
      error: (error) => { console.log(error); this.validationErrors = error;}
    });
  }
}
