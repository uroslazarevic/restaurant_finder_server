module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define(
        'Restaurant',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            ['featured_image']: DataTypes.STRING,
            cuisines: DataTypes.STRING,
            ['locality_verbose']: DataTypes.STRING,
            ['rating_color']: DataTypes.STRING,
            ['aggregate_rating']: DataTypes.STRING,
            ['res_id']: DataTypes.INTEGER,
        },
        {
            underscored: true,
        }
    );
    Restaurant.associate = function(models) {
        // associations can be defined here
        Restaurant.belongsTo(models.Collection, { foreignKey: 'collection_id' });
    };

    return Restaurant;
};
