import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';


interface NavItem {
  icon: string;
  route: string;
  title: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mobileQuery!: MediaQueryList;

  fillerNav: NavItem[] = [
    {
      icon: 'home',
      route: '/ficha_clinica',
      title: 'Fichas de Clinica'
    },
    {
      icon: 'home',
      route: '/categorias',
      title: 'Categorias'
    },
    {
      icon: 'home',
      route: '/subcategorias',
      title: 'SubCategorias'
    },
    {
      icon: 'home',
      route: '/reserva',
      title: 'Reservas'
    },
    {
      icon: 'logout',
      route: '/login',
      title: 'Cerrar Sesion'
    },
  ];


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
