import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BasicDialogComponent } from './shared/components/basic-dialog/basic-dialog.component';


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
  //Add loggedin subject behavior
  //Add loggedin subject behavior

  private _loggedIn: Subject<boolean> = new Subject<boolean>();
  loggedIn = this._loggedIn.asObservable();

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

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    // this._loggedIn.next(localStorage.getItem('usuario') != null);
    this._loggedIn.subscribe((value) => {
      console.log('value', value);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const myDialog = this.dialog.open(BasicDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    myDialog.afterClosed().subscribe((data) => {
      console.log('The dialog was closed');
      if (data) {
        this.router.navigate(['/login']);
      }
    });
  }
}
