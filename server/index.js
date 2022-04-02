"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.get("/promotion-types", (req, res) => {
    res.json({
        result: [
            { id: 1, name: "deal" },
            { id: 2, name: "discount" },
        ],
    });
});
app.get("/customers", (req, res) => {
    res.json({
        result: [
            { id: 1, name: "Default" },
            { id: 2, name: "Microsoft" },
            { id: 3, name: "Amazon" },
            { id: 4, name: "Facebook" },
        ],
    });
});
app.get("/items", (req, res) => {
    res.json({
        result: [
            {
                id: 1,
                name: "Small Pizza",
                desc: "10' pizza for one person",
                img: "https://media.istockphoto.com/photos/tasty-delicious-pizza-food-on-a-black-background-picture-id1189887005?k=20&m=1189887005&s=612x612&w=0&h=awpP8SrvtTgrC96uooRbdvLdayxQExcm0nLCCQJlYJ8=",
                price: 11.99,
            },
            {
                id: 2,
                name: "Medium Pizza",
                desc: "12' pizza for two person",
                img: "https://thumbs.dreamstime.com/b/isolated-round-pizza-black-background-tomatoes-aside-space-text-enlargement-italian-style-recepies-authentic-fresh-175907270.jpg",
                price: 15.99,
            },
            {
                id: 3,
                name: "Large Pizza",
                desc: "15' pizza for four person",
                img: "https://media.istockphoto.com/photos/rich-fajita-chicken-mexican-pizza-with-olives-and-jalapenos-picture-id186818326?k=20&m=186818326&s=612x612&w=0&h=xSYUB-eFC853F_Rl8APE1rXTkEwmVE5czWTC6Cqw3xo=",
                price: 21.99,
            },
        ],
    });
});
app.get("/rules", (req, res) => {
    res.json({
        result: [
            {
                customer_id: 2,
                rules: [
                    {
                        promotion_type_id: 1,
                        item_id: 1,
                        buy: 2,
                        get: 3,
                    },
                ],
            },
            {
                customer_id: 3,
                rules: [
                    {
                        promotion_type_id: 2,
                        item_id: 3,
                        price_after_discount: 19.99,
                    },
                ],
            },
            {
                customer_id: 4,
                rules: [
                    {
                        promotion_type_id: 1,
                        item_id: 2,
                        buy: 4,
                        get: 5,
                    },
                ],
            },
        ],
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
