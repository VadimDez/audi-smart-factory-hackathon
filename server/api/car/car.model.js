'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Cars', {
    LFD_NR: DataTypes.INTEGER,
    FARBSCHLUESSEL: DataTypes.STRING,
    FZGKL: DataTypes.STRING,
    PR_Nummer: DataTypes.STRING,
    KENNNR: DataTypes.STRING,
    VIN: DataTypes.STRING
  });
}
