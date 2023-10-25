class ProductManager {
    constructor() {
        this.products = [];
        this.autoIncrementId = 1;
    }

    //Todos los pructos.
    getProducts() {
        return this.products;
    }
    //Producto por ID.
    getProductById(id = 0) {
        const product = this.products.find((p) => p.id === id);
        if (product !== undefined) {
            return product;
        } else {
            if (product === null) {
                return "El producto es nulo.";
            } else {
                return "Producto no encontrado.";
            }
        }
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------/

    //Agregar Productos.
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

    //-----------------------------------------------------------------------------------------------------------------------------------------/

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
    
        if (productIndex !== -1) { // Verifica si se encontró el producto
            this.products.splice(productIndex, 1); // Elimina el producto
            // Puedes guardar los cambios si es necesario
            return true; // Indica que se eliminó con éxito
        } else {
            return false; // Indica que el producto no se encontró
        }
    }
    
    //-----------------------------------------------------------------------------------------------------------------------------------------/

    updateProduct(id, newArray) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        
        if (productIndex !== -1) { // Verifica si se encontró el producto
            this.products[productIndex] = { ...this.products[productIndex], ...newArray };
            // Guarda los cambios si es necesario
            return this.products[productIndex];
        } else {
            return null; // Indica que el producto no se encontró
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
        code: "P3",
        stock: 505,
        });
    

    // GETPRODUCTS
    const allProducts = manager.getProducts();
    console.log(`\n-----------------------------------------------------------------------------------------------\n`);
    console.log("Todos los productos:", allProducts);

    //  GETBYID
    /*const productById = manager.getProductById(2);
    console.log(`Producto con ID: ${productById.id}`);*/
    
    // GETINEXISTESNTE
    /*const productByIdNotFound = manager.getProductById(3); //Constante para testear un id que no existe.
    console.log(productByIdNotFound);*/


    //Eliminar producto ---->
    const deleteProduct = manager.deleteProduct(3);
    setTimeout(() => { 
        console.log(`\n-----------------------------------------------------------------------------------------------\n
                    Lista Actualizada después de eliminar -> :\n ${JSON.stringify(allProducts, null, 2)}`);
    } , 1000);


    
    //Modificar producto ---->
    const newData = {title: "Actualizando Titulo", price: 9999, stock: 2};
    setTimeout(() => { 
        const updateProduct = manager.updateProduct(2, newData);
        console.log(`\n------------------------------------------------------------------------------------------------\n
                    Lista Actualizada después de Modificar -> :\n ${JSON.stringify(allProducts, null, 2)}`);
    } , 2000);
