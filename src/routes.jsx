import { lazy } from 'react'

// Administrators
const AdministratorsPage = lazy(() => import('./views/Admin/Administrators'))

// Reports
const ReportsPage = lazy(() => import('./views/Admin/Reports'))

// Banks
const BanksPage = lazy(() => import('./views/Admin/Banks'))
const OneBankPage = lazy(() => import('./views/Admin/Banks/OneBankPage'))

// Reference Books
const ReferenceBooksPage = lazy(() => import('./views/Admin/ReferenceBooks'))

export const ROOT_ROUTE = '/'

export const PAGE404_ROUTE = '/404'
export const SIGNIN_ROUTE = '/signin'

export const ADMINISTRATORS_PAGE_ROUTE = '/administrators'

export const REPORTS_PAGE_ROUTE = '/reports'

export const BANKS_ROUTE = '/banks'
export const ONE_BANK_ROUTE = '/banks/:bankname'

export const REFERENCE_BOOKS_ROUTE = '/reference_books'
export const ONE_REFERENCE_ROUTE = '/reference_books/:referencename'

export const routes = [
  {
    navigated: true,
    path: BANKS_ROUTE,
    component: BanksPage,
    name: {
      id: 'banks',
      defaultMessage: 'Банки',
    },
    children: {
      navigated: true,
      path: ONE_BANK_ROUTE,
      component: OneBankPage,
      name: {
        id: 'onebank',
        defaultMessage: 'Банки',
      },
      access: ['SuperAdmin', 'Admin'],
    },
    access: ['SuperAdmin', 'Admin'],
  },
  {
    navigated: true,
    path: REPORTS_PAGE_ROUTE,
    component: ReportsPage,
    name: {
      id: 'reports',
      defaultMessage: 'Отчеты',
    },
    access: ['SuperAdmin', 'Admin'],
  },
  {
    navigated: true,
    path: ADMINISTRATORS_PAGE_ROUTE,
    component: AdministratorsPage,
    name: {
      id: 'administrators',
      defaultMessage: 'Администраторы',
    },
    access: ['SuperAdmin'],
  },
  {
    navigated: true,
    path: REFERENCE_BOOKS_ROUTE,
    component: ReferenceBooksPage,
    name: {
      id: 'reference_books',
      defaultMessage: 'Справочники',
    },
    children: {
      navigated: true,
      path: ONE_REFERENCE_ROUTE,
      name: {
        id: 'one_reference_book',
        defaultMessage: 'Справочник',
      },
      access: ['SuperAdmin', 'Admin'],
    },
    access: ['SuperAdmin', 'Admin'],
  },
]

export default routes
