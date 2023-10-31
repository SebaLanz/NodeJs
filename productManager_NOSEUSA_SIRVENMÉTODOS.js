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

   
