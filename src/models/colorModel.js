import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  hexCode: { type: String },
  rgbCode: { type: String }
});

const Color = mongoose.model('Color', colorSchema);

export default Color;
