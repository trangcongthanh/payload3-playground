import { nanoid } from "nanoid";
import type { CollectionConfig, FieldHook } from "payload";

export const generateCustomerId: FieldHook = ({ value, operation }) => {
  if (operation !== "create" || Boolean(value)) {
    return value;
  }
  return `cus${nanoid()}`;
};

export const Customers: CollectionConfig = {
  slug: "customers",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "id",
      type: "text",
      unique: true,
      required: true,
      admin: {
        hidden: true,
      },
      hooks: {
        beforeValidate: [generateCustomerId],
      },
    },
    { name: "name", type: "text", saveToJWT: true, required: true },
    {
      name: "emailVerified",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "outlets",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "phone", type: "text", required: true },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "province", type: "text", required: true },
            { name: "district", type: "text", required: true },
            { name: "ward", type: "text", required: true },
          ],
        },
        { name: "address", type: "text", required: true },
        {
          name: "labelAs",
          type: "radio",
          defaultValue: "home",
          options: [
            {
              label: "Home",
              value: "home",
            },
            { label: "Work", value: "work" },
          ],
        },
        { name: "isDefault", type: "checkbox" },
      ],
    },
  ],
};
