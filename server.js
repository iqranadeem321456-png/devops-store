const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const products = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 59.99, stock: 14, icon: '🎧', desc: 'Over-ear, 30-hour battery, noise isolation.' },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: 89.0, stock: 9, icon: '⌚', desc: 'Heart-rate tracking, sleep insights, 5-day battery.' },
  { id: 3, name: 'Mechanical Keyboard', category: 'Electronics', price: 74.5, stock: 20, icon: '⌨️', desc: 'Hot-swappable switches with a compact layout.' },
  { id: 4, name: 'Canvas Backpack', category: 'Fashion', price: 42.0, stock: 25, icon: '🎒', desc: 'Water-resistant, fits a 15-inch laptop.' },
  { id: 5, name: 'Sunglasses', category: 'Fashion', price: 24.99, stock: 30, icon: '🕶️', desc: 'UV400 protection with a lightweight frame.' },
  { id: 6, name: 'Ceramic Mug Set', category: 'Home', price: 18.5, stock: 40, icon: '☕', desc: 'Set of four, dishwasher and microwave safe.' },
  { id: 7, name: 'Desk Lamp', category: 'Home', price: 31.0, stock: 12, icon: '💡', desc: 'Dimmable LED with three colour temperatures.' },
  { id: 8, name: 'Yoga Mat', category: 'Sports', price: 27.0, stock: 18, icon: '🧘', desc: 'Non-slip, 6 mm thick, easy to carry.' },
  { id: 9, name: 'Water Bottle', category: 'Sports', price: 15.0, stock: 50, icon: '🥤', desc: 'Insulated steel, keeps drinks cold for 24 hours.' }
];
const orders = [];

app.get('/api/products', (req, res) => {
  const { category, q } = req.query;
  let list = products;
  if (category && category !== 'All') list = list.filter(p => p.category === category);
  if (q) list = list.filter(p => (p.name + p.desc).toLowerCase().includes(String(q).toLowerCase()));
  res.json(list);
});
app.get('/api/products/:id', (req, res) => {
  const p = products.find(x => x.id === +req.params.id);
  p ? res.json(p) : res.status(404).json({ error: 'Product not found' });
});
app.post('/api/orders', (req, res) => {
  const { items, name, email } = req.body || {};
  if (!name || !email || !Array.isArray(items) || !items.length)
    return res.status(400).json({ error: 'Name, email and at least one item are required.' });
  let total = 0;
  for (const it of items) {
    const p = products.find(x => x.id === it.id);
    if (!p || it.qty < 1 || it.qty > p.stock)
      return res.status(409).json({ error: 'Not enough stock for ' + (p ? p.name : 'an item') + '.' });
    total += p.price * it.qty;
  }
  items.forEach(it => { products.find(x => x.id === it.id).stock -= it.qty; });
  const order = { id: 'ORD-' + (1000 + orders.length + 1), name, email, items, total: +total.toFixed(2) };
  orders.push(order);
  res.status(201).json(order);
});
app.get('/health', (req, res) => res.send('OK'));

const port = process.env.PORT || 3000;
if (require.main === module) app.listen(port, () => console.log('Store running on ' + port));
module.exports = app;
