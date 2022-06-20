import React from 'react';

import {Routes, NavLinks} from 'common/types';

export const ROUTES: Routes = [
  {
    path: '/summary',
    exact: true,
    component: React.lazy(() => import('pages/summary')),
  },
  {
    path: '/about',
    exact: true,
    component: React.lazy(() => import('pages/about')),
  },
  {
    path: '/summary/:slug',
    exact: true,
    component: React.lazy(() => import('pages/summary-to-country')),
  },
];

export const NAV_LINKS: NavLinks = [
  {path: '/', label: 'Summary', i18key: 'menu.home'},
  {path: '/summary/country', label: 'Summary to country', i18key: 'menu.summary_to_country'},
  {path: '/about', label: 'About', i18key: 'menu.about'},
];
