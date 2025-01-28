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
                setTotalPages(Math.ceil(response.data.total/productsPerPage));
            } catch (error) {
                console.error('Błąd podczas pobierania produktów:', error);
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
            console.error('Błąd podczas dodawania produktu:', error);
        }
    };

    const handleEditProduct = async (product) => {
        try {
            await axios.put(`/api/admin/updateProduct/${product.product_id}`, product, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditingProduct(null);
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Błąd podczas aktualizacji produktu:', error);
        }
    };

    const handleChangeActiveStatus = async (productId, status) => {
        try {
            await axios.delete(`/api/admin/productSetActiveStatus/${productId}/${status}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Błąd podczas zmiany statusu aktywności:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className={styles.productsList}>
            <h2 className={styles.title}>Lista produktów</h2>
            <button
                className={styles.addButton}
                onClick={() =>
                    setNewProduct({ name: '', category: '', price: '', description: '' })
                }
            >
                Dodaj nowy produkt
            </button>
            {newProduct && (
                <div className={styles.newProductForm}>
                    <h3>Dodaj nowy produkt</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nazwa"
                        value={newProduct.name}
                        onChange={(e) => handleInputChange(e, setNewProduct)}
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Kategoria"
                        value={newProduct.category}
                        onChange={(e) => handleInputChange(e, setNewProduct)}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Cena"
                        value={newProduct.price}
                        onChange={(e) => handleInputChange(e, setNewProduct)}
                    />
                    <textarea
                        name="description"
                        placeholder="Opis"
                        value={newProduct.description}
                        onChange={(e) => handleInputChange(e, setNewProduct)}
                    ></textarea>
                    <button className={styles.saveButton} onClick={handleAddNewProduct}>
                        Zapisz produkt
                    </button>
                    <button className={styles.cancelButton} onClick={() => setNewProduct(null)}>
                        Anuluj
                    </button>
                </div>
            )}
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>ID Produktu</th>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Cena</th>
                    <th>Opis</th>
                    <th>Akcje</th>
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
                                            Zapisz
                                        </button>
                                        <button
                                            className={styles.cancelButton}
                                            onClick={() => setEditingProduct(null)}
                                        >
                                            Anuluj
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{product.product_id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{(product.price / 100).toFixed(2)}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        {product.active ? (
                                            <>
                                                <button
                                                    className={styles.editButton}
                                                    onClick={() => setEditingProduct(product)}
                                                >
                                                    Edytuj
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
                                                    Usuń
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
                                                Przywróć
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
                            Brak produktów.
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
                    Poprzednia
                </button>
                <span>
                    Strona {currentPage} z {totalPages}
                </span>
                <button
                    className={styles.pageButton}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Następna
                </button>
            </div>
        </div>
    );
}

export default ProductsList;
