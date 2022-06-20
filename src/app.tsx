import React, {Suspense} from 'react';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';

import {Layout, LayoutContent, LayoutFooter, LayoutHeader} from 'components/layout';
import {NAV_LINKS, ROUTES} from 'common/router';

function PageLoader() {
  return <div>Загрузка...</div>;
}

function NotFound() {
  return <div>404</div>;
}

function RootRoutes() {
  const isRootPath = useLocation().pathname === '/';

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {isRootPath && <Redirect to="/summary" from="/" exact />}
        {ROUTES.map(({path, exact, component}) => (
          <Route key={path} path={path} exact={exact} component={component} />
        ))}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export function App() {
  return (
    <Layout>
      <LayoutHeader links={NAV_LINKS} />
      <LayoutContent>
        <RootRoutes />
      </LayoutContent>
      <LayoutFooter />
    </Layout>
  );
}
