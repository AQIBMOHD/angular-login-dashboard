import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const redirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAdmin()) {
    router.navigate(['/admin-dashboard']);
    return false;
  }
  if (auth.isUser()) {
    router.navigate(['/user-dashboard']);
    return false;
  }

  // agar login nahi hai to login par bhej do
  router.navigate(['/login']);
  return false;
};
