import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, default: '' },
    order: { type: Number, default: 0 }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lessons: { type: [lessonSchema], default: [] },
    isPublished: { type: Boolean, default: false },
    price: { type: Number, default: 19, min: 0 }
    ,
    category: { type: String, enum: ['Web Dev', 'Design', 'Data', 'Mobile', 'AI'], default: 'Web Dev', index: true }
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);


