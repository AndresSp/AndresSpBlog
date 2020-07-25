'use strict';

module.exports = ( db, Schema ) => {

  const userSchema = new Schema( {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
  },
    {
      timestamps: true
    }
  );

  db.model( 'User', userSchema );
}