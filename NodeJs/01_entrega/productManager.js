class ProductManager {
    constructor() {
        this.products = [];
        this.autoIncrementId = 1;
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
        console.log("Todos los campos son obligatorios.");
        return;
        }

        if (this.products.some((p) => p.code === product.code)) {
        console.log("El código ya existe. Debe ser único.");
        return;
        }
        product.id = this.autoIncrementId++;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
        return product;
        } else {
        console.log("Producto no encontrado.");
        }
    }
    }

    // Instancio objeto.
    const manager = new ProductManager();

    manager.addProduct({
        title: "Producto 1",
        description: "Descripción del Producto 1",
        price: 10.99,
        thumbnail: "imagen1.jpg",
        code: "P1",
        stock: 100,
    });

    manager.addProduct({
        title: "Producto 2",
        description: "Descripción del Producto 2",
        price: 15.99,
        thumbnail: "imagen2.jpg",
        code: "P2",
        stock: 50,
    });
    //Agrego producto con el mismo código.
    manager.addProduct({
        title: "Producto 3",
        description: "Descripción del Producto 3",
        price: 15.23,
        thumbnail: "imagen3.jpg",
        code: "P2",
        stock: 50,
        });
    
    const allProducts = manager.getProducts();
    console.log("Todos los productos:", allProducts);
    const productById = manager.getProductById(1);
    console.log(`Producto con ID: ${productById.id}, ${productById}`);
    const productByIdNotFound = manager.getProductById(3); //Constante para testear un id que no existe.