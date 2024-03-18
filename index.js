import express from 'express'
import db from './src/config/db.js'
import userRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js';
import comentRoutes from './src/routes/comentRoutes.js'
import companiesRoutes from './src/routes/companiesRoutes.js'
import categoryRoutes from './src/routes/categoryRoutes.js'
import rolRoutes from './src/routes/rolRoutes.js'
import { transporter } from './src/helpers/nodemailer.js'
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.js';

const app = express()



app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


try {
    await db.authenticate();
    //create table if not exist
   //await db.sync({ force: true });
    //seeders()
    console.log('Connection has been established successfully.');

}
catch (error) {
    console.log(error);
}

//validar que se envien los correos
transporter.verify().then(() => {
    console.log('Ready for send emails')
}).catch((error) => {
    console.log(error)
})

//recibir json
app.use(express.json());
//recibir datos por formulario
app.use(express.urlencoded({ extended: true }));

app.use('/companies', companiesRoutes);
app.use('/coments', comentRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/rols', rolRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = 3000 || process.env.PORT

app.listen(port, () => {
    console.log( `Server is running on port ${port || process.env.PORT}`)
})