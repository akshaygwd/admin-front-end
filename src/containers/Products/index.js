import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';

const Products = (props) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [productDetail, setProductDetail] = useState(null);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    const handleClose = (e) => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('category', categorySelect);

        for(let pic of productPictures) {
            form.append('productPicture', pic);
        }

        dispatch(addProduct(form));

        setShow(false);
    }

    const createCategoryList = (categories, options=[]) => {
        for(let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            })
            if(category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }

        return options;
    }

    const handleShow = () => setShow(true);

    const handleProductDetailModal = () => setProductDetailModal(false);

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }

    const showProductDetailsModal = (product) => {
        setProductDetail(product);
        setProductDetailModal(true);
    }

    const renderProductDetailsModal = () => {
        if(!productDetail) {
            return null;
        }
        return (
            <Modal size='lg' show={productDetailModal} onHide={handleProductDetailModal}>
                <Modal.Header closeButton>
                <Modal.Title>Product Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="6">
                            <label className="key">Name</label>
                            <p className="value">{productDetail.name}</p>
                        </Col>
                        <Col md="6">
                            <label className="key">Price</label>
                            <p className="value">{productDetail.price}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <label className="key">Quantity</label>
                            <p className="value">{productDetail.quantity}</p>
                        </Col>
                        <Col md="6">
                            <label className="key">Category</label>
                            <p className="value">{productDetail.category.name}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <label className="key">Description</label>
                            <p className="value">{productDetail.description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{display: 'flex'}}>
                            {productDetail.productPictures.map((picture) =>
                                <div className="productImgContainer">
                                    <img src={generatePublicUrl(picture.img)} />
                                </div>
                            ) }
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleProductDetailModal}>
                    Okay
                </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    console.log(productPictures);

    return (
        <Layout sidebar>
            <Container>
            <Row>
                <Col md={12}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3>Product</h3>
                        <button onClick={handleShow}>Add</button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <Table style={{fontSize: 12}} responsive>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            product.products.length > 0 ?
                            product.products.map(product =>
                                <tr onClick={() => showProductDetailsModal(product)}>
                                    <td>2</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                </tr>
                            )
                            :
                            null
                        }
                    </tbody>
                    </Table>
                </Col>
            </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={name}
                        placeholder={'product name'}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        value={quantity}
                        placeholder={'Quantity'}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Input
                        value={price}
                        placeholder={'price'}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input
                        value={description}
                        placeholder={'description'}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select className="form-control" value={categorySelect} onChange={(e) => setCategorySelect(e.target.value)}>
                    <option> select category </option>
                    {
                        createCategoryList(category.categories).map(option => {
                            return (
                                <option value={option.value}>{option.name}</option>
                            )
                        })
                    }
                    </select>
                    {
                        productPictures.length > 0 ?
                        productPictures.map(pic => <div>{JSON.stringify(pic.name)}</div>)
                        :
                        null
                    }
                    <input type="file" name="productPicture" onChange={handleProductPictures} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            {renderProductDetailsModal()}
        </Layout>
    )
}

export default Products;