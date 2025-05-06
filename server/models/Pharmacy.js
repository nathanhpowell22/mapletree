import mongoose from "mongoose";

const PharmacySchema = new mongoose.Schema(
  {
    id: Number,
    pharmacy: String,
    date_screened: Date,
    yob: Number,
    sex: String,
    state: String,
    allergies: String,
    ehtnicity: String,
    race: String,
    height: Number,
    weight: Number,
    bmi: Number,
    hr: Number,
    tc: Number,
    hdl: Number,
    ldl: Number,
    tri: Number,
    glucose: Number,
    a1c: Number,
    has_diabetes: Boolean,
    has_high_bp: Boolean,
    has_high_cholesterol: Boolean,
    has_copd: Boolean,
    has_kidney_disease: Boolean,
    has_pcp: Boolean,
    has_visited_pcp: Boolean,
    smokes: Boolean,
    has_numbness_tingling: Boolean,
    has_health_insurance: Boolean,
    ins_medicare: Boolean,
    ins_medicaid: Boolean,
    ins_commercial: Boolean,
    ins_other: Boolean,
    ins_multi: Boolean,
    insurance_type: String,
  },
  { timestamps: true }
);

const Pharmacy = mongoose.model("Pharmacy", PharmacySchema);
export default Pharmacy;