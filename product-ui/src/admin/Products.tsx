import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Wrapper from "./Wrapper";
import { Product } from "../interfaces/Product";

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        (
            async () => {
                const products = await fetch("http://localhost:8000/api/products/");
                const data = await products.json();
                // console.log(data);
                setProducts(data);
            }
        )();
    }, [])


    const DeleteProduct = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await fetch(`http://localhost:8000/api/products/${id}`, { method: 'DELETE' });
            setProducts(products.filter((p: Product) => p.id !== id));
        }
    }

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-mb-0">
                    <Link to={'/admin/products/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: Product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td><img src={product.image} height="180" /></td>
                                    <td>{product.title}</td>
                                    <td>{product.likes}</td>
                                    <td>
                                        <Link to={`/admin/products/${product.id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        <a href="#" className="btn btn-sm btn-outline-secondary" onClick={() => DeleteProduct(product.id)}>Delete</a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
};

export default Products;