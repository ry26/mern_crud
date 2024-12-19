const shainkeydetailsModel = (sequelize, Sequelize) => {
    const shainkeydetail = sequelize.define('shainkeydetail', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Name: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        Mobile: {
            type: Sequelize.BIGINT,
            allowNull: true
        },
        Designation: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: {
            //     model: 'users', // Foreign key reference to the 'user' model
            //     key: 'id'
            // },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        },

        userEmail:{
            type: Sequelize.STRING,
        },
        userPassword:{
            type: Sequelize.STRING
        },
    }, 
);

    // Associations
    // Client.associate = function(models) {
    //     // Association with User model
    //     Client.belongsTo(models.user, {
    //         foreignKey: 'createdBy',
    //         onDelete: 'RESTRICT',
    //         onUpdate: 'CASCADE'
    //     });
    // };

    return shainkeydetail;
};

export default shainkeydetailsModel;