const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// A simple in-memory token blacklist
const tokenBlacklist = new Set();

// Middleware to check if a token is in the blacklist
function isTokenBlacklisted(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is in the Authorization header

  if (token && tokenBlacklist.has(token)) {
    return res
      .status(401)
      .json({ message: "Token is blacklisted. Please log in again." });
  }

  next();
}

// POST /logout
// This route handles user logout by blacklisting their token
router.post("/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming token is in the Authorization header

  if (token) {
    tokenBlacklist.add(token);
  }

  res.json({ message: "Logout successful" });
});

// Example protected route - you can use `isTokenBlacklisted` middleware to protect routes
router.get("/protected", isTokenBlacklisted, (req, res) => {
  res.json({ message: "This is a protected route" });
});

module.exports = router;

exports.register = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // const profile = req.file;
    const profile = req?.files?.map((val) => {
      return val.filename;
    });
    if (!name || !email || !password)
      return next(new Error("Fill require fields"));

    const findUser = await User.findOne({ email });
    if (findUser) return next(new Error("email already register"));

    const createUser = await User.create({ name, email, profile, password });
    return res.json({
      status: true,
      message: "Register Successfully",
      createUser,
    });
  } catch (error) {
    throw new Error(error.message);
    // res.status(500).json({
    //   status: false,
    //   message: error.message
    // });
  }
});

const dynamicKey = "age";
const dynamicValue = 30;

const dynamicObject = {
  name: "Aman",
};

// Using bracket notation to
//set properties dynamically
dynamicObject[dynamicKey] = dynamicValue;
dynamicObject["city"] = "Noida";

console.log(dynamicObject);

// multiple file in one object ♫♫♂╡○e♂♫☼♀◙○ì◘◄►☼♪╡►525
files.filter((file) => {
  const key = file.fieldname;
  profile[key] = file.filename;
});

files.filter((file) => {
  const key = file.fieldname;

  console.log(profiles[key]);
  if (!profiles[key]) {
    profiles[key] = [];
  }

  profiles[key].push(file.filename);
});

// _______________________________________________________Add to cart________________________________

[
  {
    $match: {
      _id: new ObjectId(id),
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user_details",
    },
  },
  {
    $unwind: "$user_details",
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
                        $eq: ["$$p.product_id", "$_id"],
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
      userName: "$user_details.name",
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
]

// ______________________________________________________________________________________________________


exports.order_project = {
  $project: {
      shipping_address: {
          company_name: 1,
          first_name: 1,
          last_name: 1,
          address: {
              address1: 1,
              address2: 1
          },
          city: 1,
          state: { $first: "$shipping_address_state.name" },
          country: { $first: "$shipping_address_country.name" },
          postal_code: 1,
          phone: 1,
          email: 1
      },
      billing_address: {
          company_name: 1,
          first_name: 1,
          last_name: 1,
          address: {
              address1: 1,
              address2: 1
          },
          city: 1,
          state: { $first: "$billing_address_state.name" },
          country: { $first: "$billing_address_country.name" },
          postal_code: 1,
          phone: 1,
          email: 1
      },
      store: { $first: '$store_id' },
      products: "$products",
      history: "$history",
      user_shipping: 1,
      "date": "$date",
      order_id: 1,
      sub_status: { $first: "$sub_statuses.name" },
      status: { $first: '$statuss.name.en' },
      total: "$total",
      profit: "$Profit",
      delivery_date: 1,
      send_to_shipping_details: 1,
      is_mobile: 1,
      tracking_info: 1,
      total_price: 1,
      tracking_number: 1,
      tax_and_vat: { $first: "$tax_and_vat" },
      total_price_usd: {
          $round: [{
              $toDouble: {
                  $divide: [
                      "$total_price",
                      "$currency_rate"
                  ]
              }
          },
              2
          ]
      },
      tax_exemption_number: 1,
      currency_rate: 1,
      payment_transaction: 1,
      payment_method: 1,
      klaviyo_purchase_event_sent: 1,
      store_credit_email_sent: 1,
      google_review_email_sent: 1,
      customer_upload: 1,
      seller_price: 1,
      shipping_cost: 1,
      createdAt: 1,
      follow_up: { $first: "$follow_ups" }
  }
}

exports.total = {
  $addFields: {
      "total": {
          $map: {
              input: {
                  $filter: {
                      input: '$total',
                      as: 'grade',
                      cond: {}
                      ,
                  },
              },
              as: 'line',
              in: {
                  "text": "$$line.text",
                  "value_text": "$$line.value_text",
                  "value": "$$line.value",
                  "key": "$$line.key",
                  "value_usd": {
                      $round: [{
                          $toDouble: {
                              $divide: [
                                  "$$line.value",
                                  "$currency_rate"
                              ]
                          }
                      },
                          2
                      ]
                  }
              }
          }
      },
      "Profit": {
          $round: [{
              $toDouble: {
                  $subtract: [
                      {
                          $divide: [
                              "$total_price",
                              "$currency_rate"
                          ]
                      },
                      { $add: ["$seller_price", "$shipping_cost"] }
                  ]
              }
          },
              2
          ]
      },
      "tax_and_vat": {
          $map: {
              input: {
                  $filter: {
                      input: '$total',
                      as: 'grade',
                      cond: {
                          $or: [{ $eq: ["$$grade.key", "vat"] }, { $eq: ["$$grade.key", "tax"] }]

                      }

                  },
              },
              as: 'line',
              in: {
                  $round: [{
                      $toDouble: {
                          $divide: [
                              '$$line.value',
                              "$currency_rate"
                          ]
                      }
                  }, 2]
              }
          }
      },
  }
}

exports.billing_address_country = {
  $lookup:
  {
      from: "countrys",
      localField: "billing_address.country",
      foreignField: "id",
      as: "billing_address_country"
  }
}

exports.billing_address_state = {
  $lookup:
  {
      from: "states",
      localField: "billing_address.state",
      foreignField: "id",
      as: "billing_address_state"
  }
}

exports.shipping_address_country = {
  $lookup:
  {
      from: "countrys",
      localField: "shipping_address.country",
      foreignField: "id",
      as: "shipping_address_country"
  }
}

exports.shipping_address_state = {
  $lookup:
  {
      from: "states",
      localField: "shipping_address.state",
      foreignField: "id",
      as: "shipping_address_state"
  }
}

exports.store = {
  $lookup:
  {
      from: "stores",
      localField: "store_id",
      foreignField: "store_id",
      pipeline: [
          {
              $lookup: {
                  from: "languages",
                  localField: "language",
                  foreignField: "_id",
                  pipeline: [{
                      $project: {
                          _id: 0,
                          status: 1,
                          code: 1,
                          sort_order: 1,
                          image: 1,
                          name: 1
                      }
                  }],
                  as: "language"
              }
          },
          {
              $lookup: {
                  from: "currencies",
                  localField: "currency",
                  foreignField: "_id",
                  pipeline: [{
                      $project: {
                          _id: 0,
                          status: 1,
                          currency_title: 1,
                          code: 1,
                          symbol: 1,
                          locale: 1,
                          prefix: 1,
                          currency_rate: 1
                      }
                  }],
                  as: "currency"
              }
          },
          {
              $set: {
                  "currency": { $first: "$currency" },
                  "language": { $first: "$language" }
              }
          }
      ],
      as: "store_id"
  }
}

exports.status = {
  $lookup:
  {
      from: "status",
      localField: "status",
      foreignField: "sort_order",
      as: "statuss"
  }
}

exports.follow_up = {
  $lookup:
  {
      from: "admins",
      localField: "follow_up",
      foreignField: "_id",
      pipeline: [{
          $project: {
              email: 1,
              name: 1,
              surname: 1
          }
      }],
      as: "follow_ups"
  }
}
exports.sub_statuss = {
  $lookup:
  {
      from: "sub_statuses",
      localField: "sub_status",
      foreignField: "sort_order",
      as: "sub_statuses"
  }
}

exports.categories_n = {
  $lookup: {
      from: "categories",
      localField: "products.tiles_slug.category_id",
      foreignField: "category_id",
      let: {
          code: { $first: "$store_id.language.code" }
      },
      pipeline: [
          {
              $project: {
                  _id: false,
                  slug: 1,
                  category_id: 1,
                  "tiles": 1,
                  "name": {
                      $let: {
                          vars: { langCode: "$$code", lineArr: { $objectToArray: "$details.name" } },
                          in: {
                              $first: {
                                  $map: {
                                      input: {
                                          $filter: {
                                              input: "$$lineArr",
                                              as: 'lineee',
                                              cond: {
                                                  $eq: ["$$lineee.k", "$$langCode"],
                                              },
                                          },
                                      },
                                      as: "warranty",
                                      in: "$$warranty.v"
                                  }
                              }
                          }
                      }
                  },
                  is_body: 1
              }
          }
      ],
      as: "categories_n"
  }
}

exports.product_id = {
  $lookup:
  {
      from: "products",
      localField: "products.product_id",
      foreignField: "product_id",
      as: "product_id"
  }
}

exports.category_sku = {
  $lookup:
  {
      from: "category_skus",
      pipeline: [{
          $project: {
              _id: 1,
              store_id: 1,
              category: 1,
              category_sku_id: 1,
              category_name: 1,
              sku: 1,
              price: 1,
              dimensions: 1,
              available: 1,
              available_shipbob_poland: 1,
              available_shipbob_australia: 1,
              available_shipbob_uk: 1,
              material: 1,
              description: 1,
          }
      }],
      as: "category_sku"
  }
}

exports.vehicle = {
  $lookup:
  {
      from: "vehicles",
      localField: "products.vehicle_id",
      foreignField: "vehicle_id",
      let: {
          code: { $first: "$store_id.language.code" }
      },
      pipeline: [
          {
              $lookup: {
                  from: "makes",
                  localField: "make",
                  foreignField: "make_id",
                  pipeline: [
                      {
                          $project: {
                              _id: false,
                              name: 1,
                              slug: 1
                          }
                      }
                  ],
                  as: "makes"
              }
          },
          {
              $lookup: {
                  from: "models",
                  localField: "model",
                  foreignField: "model_id",
                  pipeline: [
                      {
                          $project: {
                              _id: false,
                              name: 1,
                              slug: 1
                          }
                      }
                  ],
                  as: "models"
              }
          },
          {
              $lookup: {
                  from: "bodies",
                  localField: "body",
                  foreignField: "body_id",
                  pipeline: [
                      {
                          $project: {
                              _id: false,
                              "name": {
                                  $let: {
                                      vars: { langCode: "$$code", lineArr: { $objectToArray: "$name" } },
                                      in: {
                                          $first: {
                                              $map: {
                                                  input: {
                                                      $filter: {
                                                          input: "$$lineArr",
                                                          as: 'lineee',
                                                          cond: {
                                                              $eq: ["$$lineee.k", "$$langCode"],
                                                          },
                                                      },
                                                  },
                                                  as: "warranty",
                                                  in: "$$warranty.v"
                                              }
                                          }
                                      }
                                  }
                              },
                              slug: 1
                          }
                      }
                  ],
                  as: "bodies"
              }
          },
          {
              $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "category_id",
                  pipeline: [
                      {
                          $project: {
                              _id: 1,
                              slug: 1,
                              "name": {
                                  $let: {
                                      vars: { langCode: "$$code", lineArr: { $objectToArray: "$details.name" } },
                                      in: {
                                          $first: {
                                              $map: {
                                                  input: {
                                                      $filter: {
                                                          input: "$$lineArr",
                                                          as: 'lineee',
                                                          cond: {
                                                              $eq: ["$$lineee.k", "$$langCode"],
                                                          },
                                                      },
                                                  },
                                                  as: "warranty",
                                                  in: "$$warranty.v"
                                              }
                                          }
                                      }
                                  }
                              },
                              is_body: 1
                          }
                      }
                  ],
                  as: "categories"
              }
          },
          { $set: { 'make_id': { $first: '$makes.slug' }, 'category_id': { $first: '$categories.slug' }, "model_id": { $first: "$models.slug" }, "body_id": { $first: "$bodies.slug" } } },
          {
              $project: {
                  _id: 1,
                  make_id: 1,
                  model_id: 1,
                  body_id: 1,
                  category_id: 1,
                  vehicle_id: 1,
                  year: 1,
                  "body_name": { $first: '$bodies.name' },
                  "category_name": { $first: '$categories' },
                  "make_name": { $first: '$makes.name' },
                  "model_name": { $first: '$models.name' },
                  "is_body": { $first: '$categories.is_body' },
              }
          }
      ],
      as: "vehicle"
  }
}

exports.let ={
    
}

exports.products_warranty = {
  $addFields: {
      "products": {
          $map: {
              input: {
                  $filter: {
                      input: '$products',
                      as: 'grade',
                      cond: {}
                      ,
                  },
              },
              as: 'line',
              in: {
                  "_id": "$$line._id",
                  "quantity": "$$line.quantity",
                  "model": "$$line.model",
                  "product_name": "$$line.product_name",
                  "price": "$$line.price",
                  "total": "$$line.total",
                  "product_id": "$$line.product_id",
                  "tiles_slug": {
                      "category_slug": {
                          $let: {
                              vars: {
                                  filtered: {
                                      $first: {
                                          $filter:
                                          {
                                              input: "$categories_n",
                                              as: "grade",
                                              cond: { $eq: ["$$grade.category_id", "$$line.tiles_slug.category_id"] },
                                          }
                                      }
                                  }
                              },
                              in: "$$filtered.slug"
                          },
                      },
                      "tiles_slug": {
                          $let: {
                              vars: {
                                  filtered: {
                                      $first: {
                                          $filter:
                                          {
                                              input: "$categories_n",
                                              as: "grade",
                                              cond: { $eq: ["$$grade.category_id", "$$line.tiles_slug.category_id"] },
                                          }
                                      }
                                  }
                              },
                              in: {
                                  $let: {
                                      vars: {
                                          filtered1: {
                                              $first: {
                                                  $filter:
                                                  {
                                                      input: "$$filtered.tiles",
                                                      as: "grade",
                                                      cond: { $eq: ["$$grade.tile_image_id", "$$line.tiles_slug.tiles_id"] },
                                                  }
                                              }
                                          }
                                      },
                                      in: {
                                          $let: {
                                              vars: { langCode: { $first: "$store_id.language.code" }, lineArr: { $objectToArray: "$$filtered1.sluge" } },
                                              in: {
                                                  $first: {
                                                      $map: {
                                                          input: {
                                                              $filter: {
                                                                  input: "$$lineArr",
                                                                  as: 'lineee',
                                                                  cond: {
                                                                      $eq: ["$$lineee.k", "$$langCode"],
                                                                  },
                                                              },
                                                          },
                                                          as: "tiles",
                                                          in: "$$tiles.v"
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  },
                              }
                          },
                      },
                      "tiles_name": {
                          $let: {
                              vars: {
                                  filtered: {
                                      $first: {
                                          $filter:
                                          {
                                              input: "$categories_n",
                                              as: "grade",
                                              cond: { $eq: ["$$grade.category_id", "$$line.tiles_slug.category_id"] },
                                          }
                                      }
                                  }
                              },
                              in: {
                                  $let: {
                                      vars: {
                                          filtered1: {
                                              $first: {
                                                  $filter:
                                                  {
                                                      input: "$$filtered.tiles",
                                                      as: "grade",
                                                      cond: { $eq: ["$$grade.tile_image_id", "$$line.tiles_slug.tiles_id"] },
                                                  }
                                              }
                                          }
                                      },
                                      in: {
                                          $let: {
                                              vars: { langCode: { $first: "$store_id.language.code" }, lineArr: { $objectToArray: "$$filtered1.cover_size" } },
                                              in: {
                                                  $first: {
                                                      $map: {
                                                          input: {
                                                              $filter: {
                                                                  input: "$$lineArr",
                                                                  as: 'lineee',
                                                                  cond: {
                                                                      $eq: ["$$lineee.k", "$$langCode"],
                                                                  },
                                                              },
                                                          },
                                                          as: "tiles",
                                                          in: "$$tiles.v"
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  },
                              }
                          },
                      },
                      "category_name": {
                          $let: {
                              vars: {
                                  filtered: {
                                      $first: {
                                          $filter:
                                          {
                                              input: "$categories_n",
                                              as: "grade",
                                              cond: { $eq: ["$$grade.category_id", "$$line.tiles_slug.category_id"] },
                                          }
                                      }
                                  }
                              },
                              in: "$$filtered.name"
                          },
                      },
                  },
                  "slugs": {
                      $first: {
                          $map: {
                              input: {
                                  $filter: {
                                      input: "$vehicle",
                                      as: 'grade1',
                                      cond: {
                                          $eq: ["$$grade1.vehicle_id", "$$line.vehicle_id"],
                                      },
                                  },
                              },
                              as: 'line1',
                              in: {
                                  body_name: "$$line1.body_name",
                                  category_name: "$$line1.category_name.name",
                                  model_name: "$$line1.model_name",
                                  make_name: "$$line1.make_name",
                                  category: "$$line1.category_id",
                                  make: "$$line1.make_id",
                                  model: "$$line1.model_id",
                                  body: { $cond: [{ $eq: ["$$line1.is_body", true] }, "$$line1.body_id", "$$REMOVE"] },
                                  year: "$$line1.year"
                              }
                          }
                      }
                  },
                  "vehicle_id": "$$line.vehicle_id",
                  "year": "$$line.year",
                  "option": "$$line.option",
                  "product_slug": {
                      $first: {
                          $map: {
                              input: {
                                  $filter: {
                                      input: '$product_id',
                                      as: 'grade1',
                                      cond: {
                                          $eq: ["$$grade1.product_id", "$$line.product_id"],
                                      },
                                  },
                              },
                              as: 'line1',
                              in: "$$line1.slug"
                          }
                      }
                  },
                  "price_usd": {
                      $round: [{
                          $toDouble: {
                              $divide: [
                                  "$$line.price",
                                  "$currency_rate"
                              ]
                          }
                      },
                          2
                      ]
                  },
                  "total_usd": {
                      $round: [{
                          $toDouble: {
                              $divide: [
                                  "$$line.total",
                                  "$currency_rate"
                              ]
                          }
                      },
                          2
                      ]
                  },
                  "Warranty": {
                      $first: {
                          $map: {
                              input: {
                                  $filter: {
                                      input: '$product_id',
                                      as: 'grade1',
                                      cond: {
                                          $eq: ["$$grade1.product_id", "$$line.product_id"],
                                      },
                                  },
                              },
                              as: 'line1',
                              in: {
                                  $first: {
                                      $map: {
                                          input: {
                                              $filter: {
                                                  input: '$$line1.attributes',
                                                  as: 'grade2',
                                                  cond: {
                                                      $eq: ["$$grade2.attribute_id", 25],
                                                  },
                                              },
                                          },
                                          as: 'line2',
                                          in: {
                                              $let: {
                                                  vars: { langCode: { $first: "$store_id.language.code" }, lineArr: { $objectToArray: "$$line2.value" } },
                                                  in: {
                                                      $first: {
                                                          $map: {
                                                              input: {
                                                                  $filter: {
                                                                      input: "$$lineArr",
                                                                      as: 'lineee',
                                                                      cond: {
                                                                          $eq: ["$$lineee.k", "$$langCode"],
                                                                      },
                                                                  },
                                                              },
                                                              as: "warranty",
                                                              in: "$$warranty.v"
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  },
                  "is_fake": {
                      $first: {
                          $map: {
                              input: {
                                  $filter: {
                                      input: '$product_id',
                                      as: 'pd',
                                      cond: {
                                          $eq: ["$$pd.product_id", "$$line.product_id"],
                                      },
                                  },
                              },
                              as: 'line1',
                              in: "$$line1.is_fake"
                          }
                      }
                  },
                  "image": {
                      $first: {
                          $map: {
                              input: {
                                  $filter: {
                                      input: '$product_id',
                                      as: 'pd',
                                      cond: {
                                          $eq: ["$$pd.product_id", "$$line.product_id"],
                                      },
                                  },
                              },
                              as: 'line1',
                              in: "$$line1.image"
                          }
                      }
                  },
                  "category_sku": {
                      $first: {
                          $map: {
                              input: {
                                  $filter: {
                                      input: '$product_id',
                                      as: 'pd',
                                      cond: {
                                          $eq: ["$$pd.product_id", "$$line.product_id"],
                                      },
                                  },
                              },
                              as: 'line1',
                              in: {
                                  "edition": {
                                      $first: {
                                          $map: {
                                              input: {
                                                  $filter: {
                                                      input: '$$line1.attributes',
                                                      as: 'grade2',
                                                      cond: {
                                                          $eq: ["$$grade2.attribute_id", 36],
                                                      },
                                                  },
                                              },
                                              as: 'line2',
                                              in: {
                                                  $let: {
                                                      vars: { langCode: { $first: "$store_id.language.code" }, lineArr: { $objectToArray: "$$line2.value" } },
                                                      in: {
                                                          $first: {
                                                              $map: {
                                                                  input: {
                                                                      $filter: {
                                                                          input: "$$lineArr",
                                                                          as: 'lineee',
                                                                          cond: {
                                                                              $eq: ["$$lineee.k", "$$langCode"],
                                                                          },
                                                                      },
                                                                  },
                                                                  as: "warranty",
                                                                  in: { $toLower: "$$warranty.v" }
                                                              }
                                                          }
                                                      }
                                                  }

                                              }
                                          }
                                      }
                                  },
                                  "category": "$$line1.category"
                              },
                          }
                      }
                  },
              }
          }
      }
  }
}

exports.history_user = {
  $lookup:
  {
      from: "admins",
      localField: "history.user",
      foreignField: "_id",
      as: "history_user"
  }
}

exports.history_status = {
  $lookup:
  {
      from: "status",
      localField: "history.status",
      foreignField: "sort_order",
      as: "history_status"
  }
}

exports.history_sub_status = {
  $lookup:
  {
      from: "sub_statuses",
      localField: "history.sub_status",
      foreignField: "sort_order",
      as: "history_sub_status"
  }
}

exports.history = {
  $addFields: {
      "history": {
          $map: {
              input: {
                  $filter: {
                      input: '$history',
                      as: 'grade',
                      cond: {}
                      ,
                  },
              },
              as: 'line4',
              in: {
                  "_id": "$$line4._id",
                  "date": "$$line4.date",
                  "comment": "$$line4.comment",
                  "sub_status": {
                      $first: {
                          $map: {
                              input: {
                                  $filter: {
                                      input: "$history_sub_status",
                                      as: 'grade',
                                      cond: { $eq: ["$$grade.sort_order", "$$line4.sub_status"] }
                                      ,
                                  },
                              },
                              as: 'line5',
                              in: "$$line5.name"
                          }
                      }
                  },
                  "user": {
                      $first: {
                          $map: {
                              input: {
                                  $filter: {
                                      input: "$history_user",
                                      as: 'grade',
                                      cond: { $eq: ["$$grade._id", "$$line4.user"] }
                                      ,
                                  },
                              },
                              as: 'line5',
                              in: {
                                  name: "$$line5.name",
                                  surname: "$$line5.surname"
                              }
                          }
                      }
                  },
                  "status": {
                      $first: {
                          $map: {
                              input: {
                                  $filter: {
                                      input: "$history_status",
                                      as: 'grade',
                                      cond: { $eq: ["$$grade.sort_order", "$$line4.status"] }
                                      ,
                                  },
                              },
                              as: 'line5',
                              in: "$$line5.name.en"
                          }
                      }
                  },
                  "customer_notified": "$$line4.customer_notified"
              }
          }
      }
  }
}