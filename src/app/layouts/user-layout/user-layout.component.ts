import { Component } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
})
export class UserLayoutComponent {
  constructor(
    private UserService: UserService,
    private router: Router
  ) {
  }

  onClickSignOut(): void {
    this.UserService.signOut().subscribe({
      next: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        this.router.navigateByUrl('/auth');
      },
      error: () => {
        toast.error("Error signing out");
      }
    })
  }
}
