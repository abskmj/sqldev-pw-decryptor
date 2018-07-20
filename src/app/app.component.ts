import { Component } from '@angular/core';
import { enc, MD5, DES, mode, pad } from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  encryptedPassword = 'F35q3vdbVrI=';
  systemId = '3e8efb59-8a5a-4c13-b1d5-ff64f987787f';

  password;

  decrypt() {
    try {
      this.password = '';
      let salt = "051399429372e8ad";

      let keyWrap = enc.Hex.parse(enc.Utf8.parse(this.systemId).toString(enc.Hex) + salt);

      for (let i = 0; i < 42; i++) {
        keyWrap = MD5(keyWrap);
      }

      keyWrap = keyWrap.toString(enc.Hex);

      let key = enc.Hex.parse(keyWrap.substr(0, 16));
      let iv = enc.Hex.parse(keyWrap.substr(16, 16));
      let data = enc.Base64.parse(this.encryptedPassword);

      let decrypted = DES.decrypt({
        ciphertext: data
      }, key, {
          iv: iv,
          mode: mode.CBC,
          padding: pad.AnsiX923
        });

      this.password = decrypted.toString(enc.Utf8);
    }
    catch (e) {
      this.password = '';
    }
  }
}
