import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName: string | null = '';
  private secretKey = 'my-very-secure-static-key-12345';
  ngOnInit() {
    const encryptedName = localStorage.getItem("userName");
    console.log("encryptedName",encryptedName);
    if (encryptedName) {
      // Decrypt the username
      const bytes = CryptoJS.AES.decrypt(encryptedName, 'my-very-secure-static-key-12345');
      console.log("bytes",bytes);
      const userNamedetails = bytes.toString(CryptoJS.enc.Utf8);
      this.userName=userNamedetails;
      console.log("userName122",userNamedetails);
    }
  }
 
}
