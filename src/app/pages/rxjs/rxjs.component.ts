import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter, retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresarObervable()
    .subscribe( 
      numero => console.log('Subs ', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observable termino!')
    )

  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('la página se cerro')
    this.subscription.unsubscribe();
  }

  regresarObervable(): Observable<any>{
    return new Observable<any>( observer => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;

        const salida = {
          valor: contador
        }

        observer.next( salida )
        // if( contador === 3){
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
      }, 1000);
    }).pipe( 
      map( res => res.valor),
      filter( (valor, index) => {
        if( (valor % 2) === 1){
          // impar
          return true;
        }else{
          // par
          return false
        }
      })
    )
  }

}
