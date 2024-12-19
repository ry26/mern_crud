const folderModel = (sequelize, Sequelize) => {
    const Folder = sequelize.define('folder', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        FolderName: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        displayFolderName: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        fparentId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'folder', // Self-referencing
                key: 'id'
            },
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        },
        isRelease: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false
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
        timestamps: true,
        tableName: 'folder',
        charset: 'utf8mb4',
        collate: 'utf8mb4_0900_ai_ci',
        indexes: [
            {
                name: 'FK_6e0b77d0f3d4bb7a0b3814f0dd5',
                fields: ['createdBy']
            },
            {
                name: 'FK_660ca8bc24213125d8b93c15f53',
                fields: ['fparentId']
            }
        ]
    });

    // Associations
    Folder.associate = function(models) {
        // Association with User model
        Folder.belongsTo(models.user, {
            foreignKey: 'createdBy',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });

        // Self-referencing association (for parent folders)
        Folder.belongsTo(Folder, {
            as: 'parentFolder',
            foreignKey: 'fparentId',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });

        // Self-referencing association for sub-folders
        Folder.hasMany(Folder, {
            as: 'subFolders',
            foreignKey: 'fparentId',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    };

    return Folder;
};

export default folderModel;
