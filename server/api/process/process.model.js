'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('prod_process', {
    // _id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    // name: DataTypes.STRING,
    // info: DataTypes.STRING,
    // active: DataTypes.BOOLEAN,

    // ID: DataTypes.INTEGER,
    LFD_NR: DataTypes.INTEGER,
    // AF: DataTypes.STRING,
    KURZTEXT: DataTypes.STRING,
    // VERRECHNUNG: DataTypes.FLOAT,
    // HAUEFIGKEIT: DataTypes.STRING,
    // GEW_VERRECHNUNG: DataTypes.FLOAT,
    // FZGKL: DataTypes.FLOAT,
    // KLASSIFIKATION: DataTypes.INTEGER,
    // ARBEITSBEREICH: DataTypes.STRING,
    // FERTIGUNGSGRUPPE: DataTypes.INTEGER,
    ARBEITSPLATZ: DataTypes.STRING,
    // PR_Nummer: DataTypes.STRING,
    real_time: DataTypes.FLOAT,
    Man: DataTypes.INTEGER,
    WorkStation: DataTypes.STRING
  });
}
