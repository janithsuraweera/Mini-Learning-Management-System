import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    status: { type: String, enum: ['paid', 'refunded'], default: 'paid' },
    cardLast4: { type: String },
    payerName: { type: String },
    payerEmail: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);


