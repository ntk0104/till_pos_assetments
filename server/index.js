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
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000'
}));
app.get('/promotion-types', (req, res) => {
    res.json({
        result: [
            { id: 1, name: 'deal' },
            { id: 2, name: 'discount' }
        ]
    });
});
app.get('/customers', (req, res) => {
    res.json({
        result: [
            { id: 1, name: 'Default' },
            { id: 2, name: 'Microsoft' },
            { id: 3, name: 'Amazon' },
            { id: 4, name: 'Facebook' }
        ]
    });
});
app.get('/items', (req, res) => {
    res.json({
        result: [
            {
                id: 1,
                name: 'Small Pizza',
                desc: "10' pizza for one person",
                img: 'https://media.istockphoto.com/photos/tasty-delicious-pizza-food-on-a-black-background-picture-id1189887005?k=20&m=1189887005&s=612x612&w=0&h=awpP8SrvtTgrC96uooRbdvLdayxQExcm0nLCCQJlYJ8=',
                price: 11.99
            },
            {
                id: 2,
                name: 'Medium Pizza',
                desc: "12' pizza for two person",
                img: 'https://thumbs.dreamstime.com/b/isolated-round-pizza-black-background-tomatoes-aside-space-text-enlargement-italian-style-recepies-authentic-fresh-175907270.jpg',
                price: 15.99
            },
            {
                id: 3,
                name: 'Large Pizza',
                desc: "15' pizza for four person",
                img: 'https://thumbs.dreamstime.com/b/isolated-round-pizza-black-background-tomatoes-aside-space-text-enlargement-italian-style-recepies-authentic-fresh-175907270.jpg',
                price: 21.99
            }
        ]
    });
});
app.get('/rules', (req, res) => {
    res.json({
        result: [
            {
                customer_id: 2,
                rules: [
                    {
                        promotion_type_id: 1,
                        item_id: 1,
                        buy: 2,
                        get: 3
                    }
                ]
            },
            {
                customer_id: 3,
                rules: [
                    {
                        promotion_type_id: 2,
                        item_id: 3,
                        price_after_discount: 19.99
                    }
                ]
            },
            {
                customer_id: 4,
                rules: [
                    {
                        promotion_type_id: 1,
                        item_id: 2,
                        buy: 4,
                        get: 5
                    }
                ]
            }
        ]
    });
});
app.get('/total', (req, res) => {
    const menuItems = [
        { id: 1, name: 'Small Pizza', price: 11.99 },
        { id: 2, name: 'Medium Pizza', price: 15.99 },
        { id: 3, name: 'Large Pizza', price: 21.99 }
    ];
    const allPricingRules = [
        {
            customer_id: 2,
            rules: [
                {
                    promotion_type_id: 1,
                    item_id: 1,
                    buy: 2,
                    get: 3
                }
            ]
        },
        {
            customer_id: 3,
            rules: [
                {
                    promotion_type_id: 2,
                    item_id: 3,
                    price_after_discount: 19.99
                }
            ]
        },
        {
            customer_id: 4,
            rules: [
                {
                    promotion_type_id: 1,
                    item_id: 2,
                    buy: 4,
                    get: 5
                }
            ]
        }
    ];
    const currentCustomerId = 3;
    class Checkout {
        constructor(allPricingRules, menuItems, currentCustomerId) {
            var _a;
            this.pricingRules = [];
            this.menuItems = [];
            this.shoppingCartItems = [];
            this.pricingRules =
                ((_a = allPricingRules.find((x) => x.customer_id === currentCustomerId)) === null || _a === void 0 ? void 0 : _a.rules) || [];
            this.menuItems = menuItems;
        }
        add(item) {
            this.shoppingCartItems.push(item);
        }
        getPrice(item) {
            var _a;
            const itemRule = this.getRule(item.id);
            const pricingItem = (_a = this.menuItems.find((x) => x.id === item.id)) === null || _a === void 0 ? void 0 : _a.price;
            if (!pricingItem) {
                return 0;
            }
            if (!itemRule) {
                return pricingItem * item.qty;
            }
            switch (itemRule.promotion_type_id) {
                case 1:
                    if (!itemRule.get ||
                        !itemRule.buy ||
                        itemRule.get === 0 ||
                        itemRule.buy === 0) {
                        return 0;
                    }
                    const remainderPricing = (item.qty % itemRule.get) * pricingItem;
                    const modulusPricing = Math.floor(item.qty / itemRule.get) * itemRule.buy * pricingItem;
                    return remainderPricing + modulusPricing;
                case 2:
                    return itemRule.price_after_discount
                        ? itemRule.price_after_discount * item.qty
                        : 0;
                default:
                    return pricingItem * item.qty;
            }
        }
        getRule(itemId) {
            if (!this.pricingRules || this.pricingRules.length === 0) {
                return null;
            }
            return (this.pricingRules.find((x) => x.item_id === itemId) ||
                null);
        }
        total() {
            return this.shoppingCartItems.reduce((prev, current) => {
                return prev + this.getPrice(current);
            }, 0);
        }
    }
    let co = new Checkout(allPricingRules, menuItems, currentCustomerId);
    co.add({ id: 1, qty: 3 });
    co.add({ id: 2, qty: 2 });
    co.add({ id: 3, qty: 1 });
    res.json({ total: co.total() });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
