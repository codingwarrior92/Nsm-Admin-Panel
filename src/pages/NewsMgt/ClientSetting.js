import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { getClientLists, addClientList, editClientList, deleteClientList } from '../../helpers/backend_helper';
import { Player } from '@lordicon/react';
const msoeawqm = require('../../assets/images/common/msoeawqm.json');
const gsqxdxog = require('../../assets/images/common/gsqxdxog.json');


const ClientSetting = () => {
  const msoeawqmRef = useRef(null);
  const gsqxdxogRef = useRef(null);

  const [clientList, setClientList] = useState([]);
  const [modal_list, setmodal_list] = useState(false);
  const [modal_delete, setmodal_delete] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    msoeawqmRef.current?.playFromBeginning();
    gsqxdxogRef.current?.playFromBeginning();
  }, [])

  useEffect(() => {
    async function fetchData() {
      const response = await getClientLists();
      setClientList(response);
    }
    fetchData();
  }, []);

  const tog_list = () => {
    setmodal_list(!modal_list);
  };

  const tog_delete = () => {
    setmodal_delete(!modal_delete);
  };

  const handleSaveClient = async (event) => {
    event.preventDefault();
    const formData = {
      name: event.target.name_field.value,
      twitter_id: event.target.twitter_id_field.value,
      website: event.target.website_field.value,
      telegram_id: event.target.telegram_id_field.value,
      twitter_followers: event.target.twitter_followers_field.value,
      telegram_subscribers: event.target.telegram_subscribers_field.value
    };

    if (editingClient) {
      try {
        const updated = await editClientList(editingClient.id, formData);
        const updatedList = clientList.map(client => client.id === updated.id ? updated : client);
        setClientList(updatedList);
        tog_list(); // Close modal after editing
      } catch (error) {
        console.error('Failed to update client', error);
      }
    } else {
      try {
        const added = await addClientList(formData);
        setClientList([...clientList, added]);
        tog_list();
      } catch (error) {
        console.error('Failed to add client', error);
      }
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await deleteClientList(id);
      const remainingClients = clientList.filter(client => client.id !== id);
      setClientList(remainingClients);
      tog_delete(); // Close the delete confirmation modal
    } catch (error) {
      console.error('Failed to delete client', error);
    }
  };

  document.title = "Dashboard | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Client Settings</h4>
                </CardHeader>

                <CardBody>
                  <div id="customerList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div>
                          <Button color="success" className="add-btn me-1" onClick={() => { tog_list(); setEditingClient(null); }} id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Button>
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
                      {clientList.length > 0 ? (
                        <table className="table align-middle table-nowrap" id="customerTable">
                          <thead className="table-light">
                            <tr>
                              {/* <th scope="col" style={{ width: "50px" }}>
                                <div className="form-check">
                                  <input className="form-check-input" type="checkbox" id="checkAll" value="option" />
                                </div>
                              </th> */}
                              <th className="sort" data-sort="name">Name</th>
                              <th className="sort" data-sort="twitter_id">Twitter ID</th>
                              <th className="sort" data-sort="website">Website</th>
                              <th className="sort" data-sort="telegram_id">Telegram ID</th>
                              <th className="sort" data-sort="twitter_followers">Twitter Followers</th>
                              <th className="sort" data-sort="telegram_subscribers">Telegram Subscribers</th>
                              <th className="sort" data-sort="action">Action</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {(clientList || []).map((item, key) => (
                              <tr key={key}>
                                {/* <th scope="row">
                                  <div className="form-check">
                                    <input className="form-check-input" type="checkbox" name="chk_child" value={key} />
                                  </div>
                                </th> */}
                                <td className="name">{item.name}</td>
                                <td className="twitter_id">{item.twitter_id}</td>
                                <td className="website">{item.website}</td>
                                <td className="telegram_id">{item.telegram_id}</td>
                                <td className="twitter_followers">{item.twitter_followers}</td>
                                <td className="telegram_subscribers">{item.telegram_subscribers}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <div className="edit">
                                      <button className="btn btn-sm btn-success edit-item-btn"
                                        data-bs-toggle="modal" onClick={() => { tog_list(); setEditingClient(item); }}>Edit</button>
                                    </div>
                                    <div className="remove">
                                      <button className="btn btn-sm btn-danger remove-item-btn"
                                        data-bs-toggle="modal" onClick={() => { tog_delete(); setEditingClient(item); }}>Remove</button>
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
        <ModalHeader className="bg-light p-3" toggle={() => { tog_list(); }}> {editingClient ? 'Edit Client' : 'Add Client'} </ModalHeader>
        <form className="tablelist-form" onSubmit={handleSaveClient}>
          <ModalBody><div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input type="text" id="name_field" className="form-control" defaultValue={editingClient ? editingClient.name : ''} placeholder="Enter Name" required />
          </div>

            <div className="mb-3">
              <label htmlFor="twitter_id_field" className="form-label">Twitter ID</label>
              <input type="text" id="twitter_id_field" className="form-control" defaultValue={editingClient ? editingClient.twitter_id : ''} placeholder="Enter Twitter ID" required />
            </div>

            <div className="mb-3">
              <label htmlFor="website_field" className="form-label">Website</label>
              <input type="text" id="website_field" className="form-control" defaultValue={editingClient ? editingClient.website : ''} placeholder="Enter Website" required />
            </div>

            <div className="mb-3">
              <label htmlFor="telegram_id_field" className="form-label">Telegram ID</label>
              <input type="text" id="telegram_id_field" className="form-control" defaultValue={editingClient ? editingClient.telegram_id : ''} placeholder="Enter Telegram ID" required />
            </div>

            <div className="mb-3">
              <label htmlFor="twitter_followers_field" className="form-label">Twitter Followers</label>
              <input type="text" id="twitter_followers_field" className="form-control" defaultValue={editingClient ? editingClient.twitter_followers : ''} placeholder="Enter Twitter Followers" required />
            </div>

            <div className="mb-3">
              <label htmlFor="telegram_subscribers_field" className="form-label">Telegram Subscribers</label>
              <input type="text" id="telegram_subscribers_field" className="form-control" defaultValue={editingClient ? editingClient.telegram_subscribers : ''} placeholder="Enter Telegram Subscribers" required />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-end">
              <button type="button" className="btn btn-light" onClick={() => setmodal_list(false)}>Close</button>
              <button type="submit" className="btn btn-success" id="add-btn">{editingClient ? 'Update' : 'Add Client' }</button>
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
            <button type="button" className="btn w-sm btn-danger" onClick={() => handleDeleteClient(editingClient.id)}>Yes, Delete It!</button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment >
  );
};

export default ClientSetting;