

// const mongoose = require("mongoose");

// const transportSchema = new mongoose.Schema({
//   transportNumber: { type: String, required: true, unique:true },
//   routeName: {type: String, required: true},
//   destination: {type: String, required: true},
//   size: { type: String, required: true },
//   driverName: { type: String, required: true },
//   mobileNumber: {type: String, required: true},  
// });

// module.exports = mongoose.model("Transport", transportSchema);


// const mongoose = require("mongoose");

// const transportNewSchema = new mongoose.Schema(
//   {
//     vehicleNumber: {
//       type: String,
//       required: true,
//       trim: true,
//       uppercase: true
//     },
//     driverName: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     driverMobileNumber: {
//       type: String,
//       required: true,
//       trim: true,
//       match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number']
//     },
//     destination: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     routeNumber: {
//       type: String,
//       required: true,
//       trim: true,
//       unique: true,
//     },
//     size: {
//       type: String,
//       required: true,
//       enum: {
//         values: ['small', 'medium', 'large'],
//         message: '{VALUE} is not supported. Use small, medium or large.'
//       }
//     }
//   },
//   {
//     // 👇 This removes the default 'id' virtual
//     id: false,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Virtual to get student capacity based on size
// transportNewSchema.virtual('studentCapacity').get(function () {
//   const capacities = {
//     small: 15,
//     medium: 30,
//     large: 40
//   };
//   return capacities[this.size];
// });



// // Enable virtuals in JSON output
// transportNewSchema.set('toJSON', { virtuals: true });
// transportNewSchema.set('toObject', { virtuals: true });

// module.exports = mongoose.model("TransportNew", transportNewSchema);

const mongoose = require("mongoose");

const transportNewSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true // good to avoid duplicates
    },
    driverName: {
      type: String,
      required: true,
      trim: true
    },
    driverMobileNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    routeNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    size: {
      type: String,
      required: true,
      enum: {
        values: ["small", "medium", "large"],
        message: "{VALUE} is not supported. Use small, medium or large."
      }
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual: studentCapacity based on size
transportNewSchema.virtual("studentCapacity").get(function () {
  const capacities = {
    small: 15,
    medium: 30,
    large: 40
  };
  return capacities[this.size] || 0;
});

// Virtual: currentStudentCount (requires population or query)
transportNewSchema.virtual("currentStudentCount", {
  ref: "NewAdmissions",
  localField: "vehicleNumber",
  foreignField: "transportVehicle",
  justOne: false,
  count: true // only get count
});

module.exports = mongoose.model("TransportNew", transportNewSchema);