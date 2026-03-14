import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },

    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },

    maxUsage: {
        type: Number,
        default: 1
    },

    usedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    isActive: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    expiresAt: {
        type: Date,
    }
}, { versionKey: false });

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);

export default PromoCode;