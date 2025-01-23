import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductsList.module.scss';

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/admin/getAllProducts/${currentPage}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const productsPerPage = 50;
                setProducts(response.data.products);
                console.log(response.data)
                setTotalPages(Math.ceil(response.data.total/productsPerPage));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [refresh, currentPage]);

    const handleInputChange = (e, setter) => {
        const { name, value } = e.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddNewProduct = async () => {
        try {
            await axios.post('/api/admin/addNewProduct', newProduct, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNewProduct(null);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async (product) => {
        console.log(token)
        try {
            await axios.put(`/api/admin/updateProduct/${product.product_id}`, product, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingProduct(null);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleChangeActiveStatus = async (productId, status) => {
        try {
            await axios.delete(`/api/admin/productSetActiveStatus/${productId}/${status}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error changing active status:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className={styles.productsList}>
            <h2 className={styles.title}>Products List</h2>
            <button
                className={styles.addButton}
                onClick={() =>
                    setNewProduct({ name: '', category: '', price: '', description: '' })
                }
            >
                Add New Product
            </button>
            {newProduct && (
                <div className={styles.newProductForm}>
                    <h3>Add New Product</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={newProduct.name}
                        onChange={(e) => handleInputChange(e, setNewProduct)}
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={newProduct.category}
                        onChange={(e) => handleInputChange(e, setNewProduct)}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => handleInputChange(e, setNewProduct)}
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newProduct.description}
                        onChange={(e) => handleInputChange(e, setNewProduct)}
                    ></textarea>
                    <button className={styles.saveButton} onClick={handleAddNewProduct}>
                        Save Product
                    </button>
                    <button className={styles.cancelButton} onClick={() => setNewProduct(null)}>
                        Cancel
                    </button>
                </div>
            )}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.length > 0 ? (
                    products.map((product) => (
                        <tr key={product.product_id} className={product.active ? '' : styles.deleted}>
                            {editingProduct?.product_id === product.product_id ? (
                                <>
                                    <td>{product.product_id}</td>
                                    <td>
                                        <input
                                            className={styles.editInput}
                                            type="text"
                                            name="name"
                                            value={editingProduct.name}
                                            onChange={(e) => handleInputChange(e, setEditingProduct)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={styles.editInput}
                                            type="text"
                                            name="category"
                                            value={editingProduct.category}
                                            onChange={(e) => handleInputChange(e, setEditingProduct)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className={styles.editInput}
                                            type="number"
                                            name="price"
                                            value={editingProduct.price}
                                            onChange={(e) => handleInputChange(e, setEditingProduct)}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            className={styles.editTextarea}
                                            name="description"
                                            value={editingProduct.description}
                                            onChange={(e) => handleInputChange(e, setEditingProduct)}
                                        ></textarea>
                                    </td>
                                    <td>
                                        <button
                                            className={styles.saveButton}
                                            onClick={() => handleEditProduct(editingProduct)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className={styles.cancelButton}
                                            onClick={() => setEditingProduct(null)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{product.product_id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        {product.active ? (
                                            <>
                                                <button
                                                    className={styles.editButton}
                                                    onClick={() => setEditingProduct(product)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className={styles.deleteButton}
                                                    onClick={() =>
                                                        handleChangeActiveStatus(
                                                            product.product_id,
                                                            !product.active
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className={styles.restoreButton}
                                                onClick={() =>
                                                    handleChangeActiveStatus(
                                                        product.product_id,
                                                        !product.active
                                                    )
                                                }
                                            >
                                                Restore
                                            </button>
                                        )}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className={styles.noData}>
                            No products found.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button
                    className={styles.pageButton}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={styles.pageButton}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ProductsList;
