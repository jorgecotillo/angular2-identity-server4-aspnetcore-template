import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service'

@Component({
    selector: 'callback',
    template: ''
})

export class CallbackComponent {
    constructor (private _authService: AuthService){
        _authService.endSigninMainWindow();
    }
}