"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core6 = require("@keystone-6/core");

// lists/User.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var User = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    email: (0, import_fields.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    password: (0, import_fields.password)({ validation: { isRequired: true } }),
    order: (0, import_fields.relationship)({ ref: "Order.user", many: true }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// lists/Book.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var Book = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    title: (0, import_fields2.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
    year: (0, import_fields2.text)({
      validation: { isRequired: true }
    }),
    genre: (0, import_fields2.text)({
      validation: { isRequired: true }
    }),
    price: (0, import_fields2.integer)({ defaultValue: 0, validation: { isRequired: true } }),
    avatar: (0, import_fields2.image)({ storage: "my_local_images" }),
    author: (0, import_fields2.relationship)({ ref: "Author.books" }),
    orderitem: (0, import_fields2.relationship)({ ref: "OrderItem.product", many: true }),
    description: (0, import_fields2.text)({
      validation: { isRequired: true }
    })
  }
});

// lists/Author.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var Author = (0, import_core3.list)({
  access: import_access3.allowAll,
  fields: {
    name: (0, import_fields3.text)({ validation: { isRequired: true } }),
    age: (0, import_fields3.text)({
      validation: { isRequired: true }
    }),
    books: (0, import_fields3.relationship)({ ref: "Book.author", many: true })
  }
});

// lists/OrderItem.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var OrderItem = (0, import_core4.list)({
  access: import_access4.allowAll,
  fields: {
    quantity: (0, import_fields4.integer)({ defaultValue: 0, validation: { isRequired: true } }),
    product: (0, import_fields4.relationship)({ ref: "Book.orderitem" }),
    order: (0, import_fields4.relationship)({ ref: "Order.cart" })
  }
});

// lists/Order.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var Order = (0, import_core5.list)({
  access: import_access5.allowAll,
  fields: {
    user: (0, import_fields5.relationship)({ ref: "User.order" }),
    cart: (0, import_fields5.relationship)({ ref: "OrderItem.order", many: true })
  }
});

// lists/index.ts
var lists_default = {
  User,
  Book,
  Author,
  OrderItem,
  Order
};

// schema.ts
var lists = {
  ...lists_default
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core6.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    server: {
      cors: { origin: ["http://localhost:3005"], credentials: true },
      port: 3e3,
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true
    },
    lists,
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    },
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
