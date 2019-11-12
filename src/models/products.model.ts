// products-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import mongoose from 'mongoose';
import { Application } from '../declarations';

export default function (app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const titleValidators = [
    {
      validator: (v: string) => v.length <= 50,
      message: (props: any) => `Title '${props.value.slice(0,10) + '...'}' is too long!`
    },
    {
      validator: (v: string) => v.length >= 2,
      message:  (props: any) => `Title is too short!`
    }
  ];
  const products = new Schema({
    title: { 
      type: String, 
      required: true,
      validate: titleValidators
    },
    price: { 
      type: Number,
      required: true,
      validate: {
        validator: (v: number) => v <= 10000,
        message: (props: any) => `${props.value} dollars is too expensive price!`
      } 
    },
    quantity: { type: Number, required: true },
    colors: { type: [String] },
    authorId: { type: mongoose.Schema.Types.ObjectId},
    createdBy: { type: String }
  }, {
    timestamps: true
  });

  return mongooseClient.model('products', products);
}
