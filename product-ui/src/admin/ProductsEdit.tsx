import React, { SyntheticEvent, useState, useEffect, PropsWithRef } from 'react';
import {Redirect} from 'react-router-dom';
import { Product } from '../interfaces/Product';
import Wrapper from "./Wrapper";

const ProductsEdit = (props: PropsWithRef<any>) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`http://localhost:8000/api/products/${props.match.params.id}`);
                const product: Product = await response.json();

                setTitle(product.title);
                setImage(product.image);
                
            }
        )();
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch(`http://localhost:8000/api/products/${props.match.params.id}`, {
            method:"PUT", 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                title,
                image
            })
        });

        setRedirect(true);
    }

    if(redirect) {
        return <Redirect to={"/admin/products"} />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label className="control">Title</label>
                    <input type="text" className="form-control" placeholder="Title" defaultValue={title} onChange={e => setTitle(e.target.value)}></input>
                </div>
                <div className="form-group">
                    <label className="control">Image URL</label>
                    <input type="text" className="form-control" placeholder="image" defaultValue={image} onChange={e => setImage(e.target.value)}></input>
                </div>
                <button className="btn btn-outline-secondary">Edit</button>
            </form>
        </Wrapper>
    );
};

export default ProductsEdit;