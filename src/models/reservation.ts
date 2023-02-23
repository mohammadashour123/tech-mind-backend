import { Schema, model, Types } from "mongoose";

export interface ReservationType {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  tech_id: Types.ObjectId | string;
}

const ReservationSchema = new Schema<ReservationType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    tech_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

ReservationSchema.virtual("fromCourse", {
  ref: "Course",
  localField: "tech_id",
  foreignField: "_id",
  justOne: true,
});
ReservationSchema.virtual("fromDiploma", {
  ref: "Diploma",
  localField: "tech_id",
  foreignField: "_id",
  justOne: true,
});
export default model("Reservation", ReservationSchema);
