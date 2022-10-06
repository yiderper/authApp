import { Component  } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent  {

  formRegistro : FormGroup = this.fb.group({
    name     : ['', [Validators.required]], 
    email    : ['',  [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(6)]], 
    
  })

  constructor(private fb: FormBuilder,
              private router: Router) { }


  registro(){
    console.log(this.formRegistro.value);
    console.log(this.formRegistro.valid);
    this.router.navigateByUrl('/dashboard')
  }

  

}
