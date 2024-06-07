import React, {useEffect, useState, useRef} from "react";
import {Button, Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
import {Player} from "@lordicon/react";
import {getMemeLists} from "../../helpers/backend_helper";
const msoeawqm = require('../../assets/images/common/msoeawqm.json');
const gsqxdxog = require('../../assets/images/common/gsqxdxog.json');

const CoinMgt = () => {
    document.title ="Meme Analyzer | Coin Management";
    const [coinList, setCoinList] = useState([]);
    const msoeawqmRef = useRef(null);
    const gsqxdxogRef = useRef(null);
    
    useEffect(() => {
        msoeawqmRef.current?.playFromBeginning();
        gsqxdxogRef.current?.playFromBeginning();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await getMemeLists();
            setCoinList(response);
        }
        fetchData();
    }, []);
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Meme Coins</h4>
                                </CardHeader>
                                <CardBody>
                                    <div id="coinList">
                                        <Row className="g-4 mb-3">
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
                                            {coinList.length > 0 ? (
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
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CoinMgt;
