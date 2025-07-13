const express = require('express');
const sequelize = require('./utls/database');
const Product = require('./models/product');
const User = require('./models/user');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

Product.belongsTo(User, {constraints: true, onDelete:"CASCADE"});
User.hasMany(Product);

app.get('/', (req, res) => {
  Product.findAll()
    .then(rows => {
      res.render('index', { data: rows });
    })
    .catch(err => {
      res.status(500).send('Internal Server Error:', err);
    });
});

app.post('/add-book', async (req, res)=> {
  await Product.create({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
  }).then(()=> {
    console.log('created book');
    res.redirect('/');
  })
  .catch(err=>{
    console.error('Error creating book:', err);
    res.status(500).render('error', { message: 'Error creating book' });
  });
  
});


app.get('/book/:id', (req, res)=> {
  const{id}= req.params;
  Product.findAll({where:{id:id}})
  .then((row)=> {
    res.render('book', {data: row[0]});
  })
  .catch(()=> {
    res.status(500).send('Internal Server Error');
  });
});

app.route('/update/:id').get((req, res)=>{
  const{id}= req.params;
  Product.findAll({where:{id:id}})
  .then((row)=> {
    res.render('update', {data: row[0]});
  })
  .catch(()=> {
    res.status(500).send('Internal Server Error');
  })
}).post((req, res)=> {
  const {id} =req.params;
  const{title, price, description}= req.body;
  Product.findByPk(id)
  .then((row)=> {
    row.title = title;
    row.price = price;
    row.description = description;
    return row.save();
  })
  .then(()=> {
    console.log('updated book');
    res.redirect('/');
  })
  .catch((err)=>{
    console.error('Error updating book:', err);
    res.status(500).send('Error updating book');
  });
});

app.post('/delete/:id', (req, res)=>{
  const {id} = req.params;
  Product.findByPk(id)
  .then((row)=> {
    return row.destroy();
  })
  .then(()=>{
    console.log('deleted book');
    res.redirect('/');
  })
  .catch((err)=>{
    console.error('Error deleting book:', err);
    res.status(500).send('Error deleting book');
  })
})

sequelize.sync({force:true})
  .then((result) => {
    app.listen(4000, () => {
      console.log('Server is running on port 4000...');
    });
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });