const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId

// exports.createOrder = asyncHandler(async (req, res, next) => {
//   try {
//     const { user, products } = req.body;
//     if (!user || !products) return next(new Error("Fill require fields"));

//     const createOrder = await Order.create({ user, products });
//     return res.json({
//       status: true,
//       message: "Order added Successfully",
//       createOrder,
//     });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// exports.getOrder = asyncHandler(async (req, res, next) => {
//   try {
//     const getDetail = await Order.aggregate([
//       {
//         $lookup: {
//           from: "products",
//           localField: "products",
//           foreignField: "_id",
//           as: "orderProduct",
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "user",
//           foreignField: "_id",
//           as: "userDetails",
//         },
//       },
//       // {
//       //   $unwind: "$orderProduct"
//       // },
//       {
//         $unwind: "$userDetails",
//       },
//       {
//         $project: {
//           user: 1,
//           products: 1,
//           orderDate: 1,
//           "userDetails.name": 1,
//           total: { $sum: "$orderProduct.price" },
//         },0000
//       },
//     ]);
//     return res.json({
//       status: true,
//       message: "Order with User name..!",
//       getDetail,
//     });
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

exports.createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { user_id, products } = req.body;
    if (!user_id || !products) return next(new Error("Fill require fields"));

    const createOrder = await Order.create({
      user_id,
      products,
    });
    return res.json({
      status: true,
      message: "Order added Successfully",
      createOrder,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

exports.billing = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  try {
    const billing = await Order.aggregate([
      // {
      //   $match: {
      //     _id: new ObjectId(id),
      //   },
      // },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_details",
        },
      },
      {
        $lookup: {
          from: "products",
          let: {
            products: "$products",
          },
          localField: "products.product_id",
          foreignField: "_id",
          pipeline: [
            {
              $addFields: {
                quantity: {
                  $let: {
                    vars: {
                      qut: {
                        $filter: {
                          input: "$$products",
                          as: "p",
                          cond: {
                            $eq: [
                              "$$p.product_id",
                              "$_id",
                            ],
                          },
                        },
                      },
                    },
                    in: {
                      $first: "$$qut.quantity",
                    },
                  },
                },
              },
            },
            {
              $addFields: {
                total: {
                  $multiply: ["$price", "$quantity"],
                },
              },
            },
            {
              $project: {
                _id: 0,
                inventory: 0,
                __v: 0,
              },
            },
          ],
          as: "product_details",
        },
      },
      {
        $addFields: {
          grandTotal: {
            $sum: "$product_details.total",
          },
          userName: {
            $first: ["$user_details.name"],
          },
        },
      },
      {
        $project: {
          userName: 1,
          orderDate: 1,
          product_details: 1,
          grandTotal: 1,
        },
      },
    ]);
    return res.json({
      status: true,
      message: "Bill details",
      billing,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});
