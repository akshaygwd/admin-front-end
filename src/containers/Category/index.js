import React, { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory } from '../../actions';
import Input from '../../components/UI/Input';

const Category = (props) => {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const category = useSelector(state => state.category);
    console.log(category, 'hit');
    const dispatch = useDispatch();

    const handleClose = (e) => {
        const form = new FormData();

        if (categoryName === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const renderCategories = (category) => {
        let categories = [];
        for(let cat of category) {
            categories.push(
                <li kay={cat.name}>
                    {cat.name}
                    {cat.children.length > 0 ?
                        <ul>
                            {renderCategories(cat.children)}
                        </ul>
                        :
                        null
                    }
                </li>
            )
        }

        return categories;
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

    const handleImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    return (<Layout sidebar>
        <Container>
            <Row>
                <Col md={12}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3>Category</h3>
                        <button onClick={handleShow}>Add</button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ul>
                        {renderCategories(category.categories)}
                    </ul>
                </Col>
            </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input
                    value={categoryName}
                    placeholder={'category name'}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select className="form-control" value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
                    <option> select category </option>
                    {
                        createCategoryList(category.categories).map(option => {
                            return (
                                <option value={option.value}>{option.name}</option>
                            )
                        })
                    }
                </select>
                <input type="file" name="categoryImage" onChange={(e) => handleImage(e)}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </Layout>)
}


export default Category;