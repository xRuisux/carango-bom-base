import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({component: Component, ...rest}) => {

  const { isUserLoggedIn } = useAuth()
  
  return (
      <Route {...rest} render={props => (
          isUserLoggedIn() ?
              <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};

export default PrivateRoute;