import React, { useEffect, useState } from 'react';
import { Product } from "../interfaces/Product";

const Main = () => {

    const [products, setProducts] = useState([] as Product[]);

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

    const like = async (id: number) => {
        await fetch(`http://localhost:8001/api/products/${id}/like`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
        setProducts(products.map(
            (product: Product) => {
                if(product.id === id) {
                    product.likes++;
                }
                return product;
            }
        ));
    }

    return (
        <main role="main">
            <div className="album py-5 bg-light"></div>
            <div className="container">
                <div className="row">

                    {products.map((product: Product) => {
                        return (
                            <div className="col" key={product.id}>
                                <div className="card shadow-sm">
                                    <img src={product.image} height="180" alt="image"/>
                                    <div className="card-body">
                                        <p className="card-text">{product.title}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => like(product.id)}> Like</button>
                                            </div>
                                            <small className="text-muted">{product.likes} likes</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>

    );
};

export default Main;