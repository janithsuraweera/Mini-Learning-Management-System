import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    progress: { type: Number, default: 0 }
  },
  { timestamps: true }
);

enrollmentSchema.index({ course: 1, student: 1 }, { unique: true });

export default mongoose.model('Enrollment', enrollmentSchema);


