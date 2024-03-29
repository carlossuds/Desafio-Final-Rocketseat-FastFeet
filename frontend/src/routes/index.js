import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Orders from '../pages/Orders';
import Couriers from '../pages/Couriers';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/encomendas" exact component={Orders} isPrivate />
      <Route path="/entregadores" exact component={Couriers} isPrivate />
    </Switch>
  );
}
