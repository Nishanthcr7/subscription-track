import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "naem is required"],
        trim: true,
        minLength: 2
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [0, 'price is required']
    },
    currency: {
        type: String,
        enum: ['INR', 'USD', 'EUR'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly'
    },
    category: {
        type: String,
        enum: 'sport, ott, recharge'
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true
    }
    ,
    status: {
        type: string,
        enum: ["active", "canceled", "expired"],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) { return value <= new Date() },
            message: "start must be lower than today"
        }
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) { return value > startDate },
            message: "end date must be higer than start date"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    options: { timestamp: true }
})

subscriptionSchema.pre('save', function (next) {
    if (!this.endDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.endDate = new Date(this.startDate);
        this.endDate.setDate(this.endDate.getDate() + renewalPeriods[this.frequency])
    }
    if (this.endDate < new Date()) this.status = "expired"
})