import userRoutes from './module/user/routes/userRoutes.js'
import clientRoutes from './module/Dashboard/Client/routes/clientRoutes.js';
import folderRoutes from './module/Dashboard/folder/routes/folderRoutes.js';
import shainkeydetailsroutes from './module/Shainkeycrud/routes/shainkeydetailsroutes.js'

const registerRoutes = (app) => {
    // Register your routes here
    app.use('/api/users', userRoutes);
    app.use('/api/clients', clientRoutes);
    app.use('/api/folder', folderRoutes);
    app.use('/api/shainkeydetails', shainkeydetailsroutes);
  
    // Add any other routes similarly
  };
  
  export default registerRoutes;