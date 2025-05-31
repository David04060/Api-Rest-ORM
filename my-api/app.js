const express = require("express"); 
require("dotenv").config(); 
const app = express(); 
const db = require("./models"); 
app.use(express.json()); 
// Rutas 
const productRoutes = require("./routes/product.routes"); 
app.use("/api/products", productRoutes); 
// Iniciar servidor y sincronizar DB 
const PORT = process.env.PORT || 3000; 
db.sequelize.sync().then(() => {
    app.listen(PORT, () => { 
        console.log(`Servidor corriendo en puerto ${PORT}`); 
    }); 
});