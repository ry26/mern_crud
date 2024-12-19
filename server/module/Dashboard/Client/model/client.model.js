const clientModel = (sequelize, Sequelize) => {
    const Client = sequelize.define('client', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        clientName: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        clientMobile: {
            type: Sequelize.BIGINT,
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
            references: {
                model: 'users', // Foreign key reference to the 'user' model
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        },
    }, {
        timestamps: true,  // Automatically manage createdAt and updatedAt
        tableName: 'client',  // Specify the table name
        charset: 'utf8mb4',  // Character set
        collate: 'utf8mb4_0900_ai_ci',  // Collation
    });

    // Associations
    Client.associate = function(models) {
        // Association with User model
        Client.belongsTo(models.user, {
            foreignKey: 'createdBy',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    };

    return Client;
};

export default clientModel;
