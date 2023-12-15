const Image = (sequelize, DataTypes) => {
  const model = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return model
}

module.exports = Image;