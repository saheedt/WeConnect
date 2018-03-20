import userRoutes from '../routes/userRoutes';
import businessRoutes from '../routes/businessRoutes';

const Routes = (app) => {
  userRoutes(app);
  businessRoutes(app);
};
export default Routes;
