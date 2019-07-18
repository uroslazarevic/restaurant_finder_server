module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define(
        'Collection',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            ['collection_id']: { type: DataTypes.INTEGER },
            ['res_count']: { type: DataTypes.INTEGER },
            description: { type: DataTypes.STRING },
            ['share_url']: { type: DataTypes.STRING },
            title: { type: DataTypes.STRING },
            url: { type: DataTypes.STRING },
            tags: { type: DataTypes.STRING },
            type: { type: DataTypes.STRING },
        },
        {
            underscored: true,
        }
    );
    Collection.associate = function(models) {
        // associations can be defined here
        Collection.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'cascade' });
        Collection.hasMany(models.Restaurant, { foreignKey: 'collection_id', onDelete: 'cascade' });
    };

    return Collection;
};
