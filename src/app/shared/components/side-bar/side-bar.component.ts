import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { BasicDialogComponent } from '../basic-dialog/basic-dialog.component';

interface NavItem {
  icon: string;
  route: string;
  title: string;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mobileQuery: MediaQueryList;

  fillerNav: NavItem[] = [
    {
      icon: 'home',
      route: '/ficha_clinica',
      title: 'Fichas de Clinica'
    },
    {
      icon: 'home',
      route: '/listar_servicio',
      title: 'Servicios'
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
    }
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private dialog: MatDialog,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



  openLogOutDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const myDialog = this.dialog.open(BasicDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    myDialog.afterClosed().subscribe(async (data) => {
      console.log('The dialog was closed');
      if (data) {
        this.localStorageService.removeItem('usuario');
        this.router.navigate(['/login']);
      }
    });

  }


}
