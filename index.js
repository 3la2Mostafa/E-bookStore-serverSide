const mongoose = require('mongoose')
const dotenv = require('dotenv');
const express = require('express')
const cors = require('cors')
dotenv.config();

const { extractUser } = require('./middleware/middleware');
const { extractAdmin } = require('./middleware/middleware');

const app = express()
const adminRouter = require('./routers/adminRouter')
const manageRouter = require('./routers/authAdminRouter')
const usersRouter = require('./routers/usersRouter')
const authRouter = require('./routers/authRouter')
const ordersRouter = require('./routers/ordersRouter');
const booksRouter = require('./routers/booksRouter');
const authorsRouter = require('./routers/authorsRouter');
const categoryRouter = require('./routers/categoryRouter')
const filterRouter = require('./routers/filterRouter');
const reviewRouter = require('./routers/reviewRouter');



app.use(express.json())
// app.use(cors())
// Enable CORS for your frontend domain
app.use(cors({
      origin: 'https://alef-book-store.netlify.app/',
}));

app.use('/admins',  adminRouter);
app.use('/admin', manageRouter);
app.use('/categories', categoryRouter);
app.use('/users',  usersRouter);
app.use('/auth', authRouter);
app.use('/orders',  ordersRouter);
app.use('/authors',  authorsRouter);
app.use('/books',  booksRouter);
app.use('/filter', filterRouter);
app.use('/review', reviewRouter);




//-----USING MULTER TO UPLOAD FILES-----//
const uploadRoutes = require('./routers/upload');
app.use('/upload', uploadRoutes);
require('dotenv').config();
//------------------------------------dy-//


var connectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(connectionString).then(() => {
      console.log('Connected to MongoDB Atlas successfully');
}).catch((error) => console.error(error));


// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
      console.log(`Server started successfully on port ${port}`);
});
