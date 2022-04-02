const FIXTURES = {
  customers: [
    { id: 1, name: 'Default' },
    { id: 2, name: 'Microsoft' },
    { id: 3, name: 'Amazon' },
    { id: 4, name: 'Facebook' }
  ],
  menuItems: [
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
  ],
  rules: [
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
}

export default FIXTURES
