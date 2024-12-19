import connection from "../config/connectDb.js";
import { Sequelize } from "sequelize";
import userModel from "../module/User/model/user.model.js";
import folderModel from "../module/Dashboard/folder/model/folder.model.js";
import clientModel from "../module/Dashboard/Client/model/client.model.js";
import shainkeydetailsmodel from "../module/Shainkeycrud/model/shainkeydetailsmodel.js"

const sequelize = new Sequelize(
    connection.config.database,
    connection.config.user,
    connection.config.password, {
    host: connection.host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: connection.config.pool.max,
        min: connection.config.pool.min,
        acquire: connection.config.pool.acquire,
        idle: connection.config.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize);
db.client = clientModel(sequelize, Sequelize);
db.folder = folderModel(sequelize, Sequelize);
db.shainkeydetail = shainkeydetailsmodel(sequelize, Sequelize)

// Ensure associations are set after model definitions
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;
