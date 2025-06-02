const db = require("../models"); 
const Product = db.products; 
exports.create = async (req, res) => {
    try { 
            const product = await Product.create(req.body); 
            res.json(product); 
        }catch (err) { 
            res.status(500).json({ message: err.message }); 
    } 
}; 
exports.findAll = async (req, res) => { 
    try { 
        const products = await Product.findAll(); 
        res.json(products); 
    }catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
}; 
exports.findOne = async (req, res) => { 
    try { 
        const product = await Product.findByPk(req.params.id); 
        product ? res.json(product) : res.status(404).send("Not found"); 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
}; 
exports.update = async (req, res) => { 
    try { 
        const rows = await Product.update(req.body, {
            where: { id: req.params.id }, 
    }); 
    res.json({ updated: rows[0] });
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    } 
}; 
exports.delete = async (req, res) => { 
    try { 
        const rows = await Product.destroy({ where: { id: req.params.id } }); 
        res.json({ deleted: rows }); 
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    } 
};
// obtener productos con stock menor de 10 unidades
exports.bajoStock = async (req, res) => {
  try {
    const bajoStock = await Product.findAll({
      where: {
        stock: {
          [db.Sequelize.Op.lt]: 10,
        },
      },
    });
    res.json(bajoStock);
  } catch (err) {
        res.status(500).json({ message: err.message });
  }
};
// aumentar stock de un producto
exports.aumentoStock = async (req, res) => {
  const { aumento } = req.body;
  if (typeof aumento !== "number" || aumento <= 0) {
    return res.status(400).json({ message: "Cantidad inválida" });
  }

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.stock += aumento;
    await product.save();

    res.json({ message: "Stock actualizado", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
