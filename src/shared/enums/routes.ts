export enum AppRouter {
  HOME = '/',
  SIGN_UP = '/signup',
  SIGN_IN = '/signin',
  ADMIN = '/admin/analytics',
  NOT_FOUND = '/*',
  PROFILE = '/profile',
  CHANGE_PASSWORD = '/change-password',
  FILTER = '/filter',
  PROJECTS = '/projects',
  USERS = '/admin/users',
  ADMIN_PROJECTS = '/admin/projects',
  PAGES = '/admin/pages',
  CHANGE_LOG = '/admin/changelog',
}

export const Pages = [
  { title: 'Main page', route: AppRouter.HOME },
  { title: 'Filters', route: AppRouter.FILTER },
  { title: 'Your profile', route: AppRouter.PROFILE },
  { title: 'Your projects', route: AppRouter.PROJECTS }
];
