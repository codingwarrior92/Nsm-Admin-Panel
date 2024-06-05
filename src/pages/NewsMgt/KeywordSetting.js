import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { getKeywordLists, addKeywordList, editKeywordList, deleteKeywordList } from '../../helpers/backend_helper';
import { Player } from '@lordicon/react';
const msoeawqm = require('../../assets/images/common/msoeawqm.json');
const gsqxdxog = require('../../assets/images/common/gsqxdxog.json');


const KeywordSetting = () => {
    const msoeawqmRef = useRef(null);
    const gsqxdxogRef = useRef(null);

    const [keywordList, setKeywordList] = useState([]);
    const [modal_list, setmodal_list] = useState(false);
    const [modal_delete, setmodal_delete] = useState(false);
    const [editingKeyword, setEditingKeyword] = useState(null);

    useEffect(() => {
        msoeawqmRef.current?.playFromBeginning();
        gsqxdxogRef.current?.playFromBeginning();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await getKeywordLists();
            setKeywordList(response);
        }
        fetchData();
    }, []);

    const tog_list = () => {
        setmodal_list(!modal_list);
    };

    const tog_delete = () => {
        setmodal_delete(!modal_delete);
    };

    const handleSaveKeyword = async (event) => {
        event.preventDefault();
        const formData = {
            title: event.target.title_field.value,
        };

        if (editingKeyword) {
            try {
                const updated = await editKeywordList(editingKeyword.id, formData);
                const updatedList = keywordList.map(keyword => keyword.id === updated.id ? updated : keyword);
                setKeywordList(updatedList);
                tog_list(); // Close modal after editing
            } catch (error) {
                console.error('Failed to update keyword', error);
            }
        } else {
            try {
                const added = await addKeywordList(formData);
                setKeywordList([...keywordList, added]);
                tog_list();
            } catch (error) {
                console.error('Failed to add keyword', error);
            }
        }
    };

    const handleDeleteKeyword = async (id) => {
        try {
            await deleteKeywordList(id);
            const remainingKeywords = keywordList.filter(keyword => keyword.id !== id);
            setKeywordList(remainingKeywords);
            tog_delete(); // Close the delete confirmation modal
        } catch (error) {
            console.error('Failed to delete keyword', error);
        }
    };

    document.title ="Meme Analyzer | Keyword Settings";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Keyword Settings</h4>
                                </CardHeader>

                                <CardBody>
                                    <div id="customerList">
                                        <Row className="g-4 mb-3">
                                            <Col className="col-sm-auto">
                                                <div>
                                                    <Button color="success" className="add-btn me-1" onClick={() => { tog_list(); setEditingKeyword(null); }} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
                                                    {/* <Button className="btn btn-soft-danger"
                          // onClick="deleteMultiple()"
                          ><i className="ri-delete-bin-2-line"></i></Button> */}
                                                </div>
                                            </Col>
                                            <Col className="col-sm">
                                                <div className="d-flex justify-content-sm-end">
                                                    <div className="search-box ms-2">
                                                        <input type="text" className="form-control search" placeholder="Search..." />
                                                        <i className="ri-search-line search-icon"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="table-responsive table-card mt-3 mb-1">
                                            {keywordList.length > 0 ? (
                                                <table className="table align-middle table-nowrap" id="customerTable">
                                                    <thead className="table-light">
                                                        <tr>
                                                            {/* <th scope="col" style={{ width: "50px" }}>
                                <div className="form-check">
                                  <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                </div>
                              </th> */}
                                                            <th className="sort" data-sort="title">Title</th>
                                                            <th className="sort" data-sort="action">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="list form-check-all">
                                                        {(keywordList || []).map((item, key) => (
                                                            <tr key={key}>
                                                                {/* <th scope="row">
                                  <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="chk_child" value={key} />
                                  </div>
                                </th> */}
                                                                <td className="name">{item.title}</td>
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <div className="edit">
                                                                            <button className="btn btn-sm btn-success edit-item-btn"
                                                                                data-bs-toggle="modal" onClick={() => { tog_list(); setEditingKeyword(item); }}>Edit</button>
                                                                        </div>
                                                                        <div className="remove">
                                                                            <button className="btn btn-sm btn-danger remove-item-btn"
                                                                                data-bs-toggle="modal" onClick={() => { tog_delete(); setEditingKeyword(item); }}>Remove</button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>) : (
                                                <div className="noresult">
                                                    <div className="text-center">
                                                        <div className="d-flex justify-content-center">
                                                            <Player
                                                                ref={msoeawqmRef}
                                                                icon={msoeawqm}
                                                                size={75}
                                                                onComplete={() => msoeawqmRef.current?.playFromBeginning()}
                                                            />
                                                        </div>
                                                        <h5 className="mt-2">Sorry! No Result Found</h5>
                                                        <p className="text-muted mb-0">We've searched more than 150+ Orders We did not find any
                                                            orders for you search.</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link className="page-item pagination-prev disabled" to="#">
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Add Modal */}
            <Modal isOpen={modal_list} toggle={() => { tog_list(); }} centered >
                <ModalHeader className="bg-light p-3" toggle={() => { tog_list(); }}> {editingKeyword ? 'Edit Keyword' : 'Add Keyword'} </ModalHeader>
                <form className="tablelist-form" onSubmit={handleSaveKeyword}>
                    <ModalBody>
                        <div className="mb-3">
                            <label htmlFor="title_field" className="form-label">Title</label>
                            <input type="text" id="title_field" className="form-control" defaultValue={editingKeyword ? editingKeyword.title : ''} placeholder="Enter Title" required />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                            <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button>
                            <button type="submit" className="btn btn-success" id="add-btn">{editingKeyword ? 'Update' : 'Add Keyword'}</button>
                        </div>
                    </ModalFooter>
                </form>
            </Modal>

            {/* Remove Modal */}
            <Modal isOpen={modal_delete} toggle={() => { tog_delete(); }} centered >
                <ModalHeader toggle={() => { tog_delete(); }}></ModalHeader>
                <ModalBody>
                    <div className="mt-2 text-center">
                        <div className="d-flex justify-content-center">
                            <Player
                                ref={gsqxdxogRef}
                                icon={gsqxdxog}
                                size={100}
                                onComplete={() => gsqxdxogRef.current?.playFromBeginning()}
                            />
                        </div>
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <button type="button" className="btn w-sm btn-light" onClick={() => setmodal_delete(false)}>Close</button>
                        <button type="button" className="btn w-sm btn-danger" onClick={() => handleDeleteKeyword(editingKeyword.id)}>Yes, Delete It!</button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment >
    );
};

export default KeywordSetting;