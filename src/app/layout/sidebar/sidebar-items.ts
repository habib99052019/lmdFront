import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
 {
    path: '',
    title: '',//Afficher avant l'icon Accueil -- Main
    moduleName: '',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '/dashboard/main',
    title: 'Accueil',
    moduleName: 'dashboard',
    iconType: 'material-icons-two-tone',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: '',
    title: 'Reservation',
    moduleName: 'booking',
    iconType: 'material-icons-two-tone',
    icon: 'book',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      {
        path: '/reservation/calendrier',
        title: 'Chambre',
        moduleName: 'reservation',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      }, 
      {
        path: '/reservation/menu',
        title: 'Menu',
        moduleName: 'reservation',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },
     /* {
        path: '/reservation/test',
        title: '',//new future 
        moduleName: 'reservation',
        iconType: '',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
      },*/
    ],
  },
 
  {
    path: '',
    title: 'Stock',
    moduleName: 'stock',
    iconType: 'material-icons-two-tone',
    icon: 'equalizer',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [
      
        {
          path: 'stock/gestion-stock',
          title: 'Gestion de stock',//
          moduleName: 'stock',
          iconType: '',
          icon: '',
          class: 'ml-menu',
          groupTitle: false,
          badge: '',
          badgeClass: '',
          submenu: [],
        },
        
        {
          path: 'stock/gestion-stock',
          title: 'Inventaire',//
          moduleName: 'stock',
          iconType: '',
          icon: '',
          class: 'ml-menu',
          groupTitle: false,
          badge: '',
          badgeClass: '',
          submenu: [],
        },
        {
          path: 'stock/courses',
          title: 'Courses',
          moduleName: 'stock',
          iconType: '',
          icon: '',
          class: 'ml-menu',
          groupTitle: false,
          badge: '',
          badgeClass: '',
          submenu: [],
        },
      
     
    ],
  },
  
];
