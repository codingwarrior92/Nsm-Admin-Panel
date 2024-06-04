import React from "react";
import { Col, Container, Row } from "reactstrap";

const CoinGraph = () => {
    document.title ="Dashboard | Velzon - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="h-100">
                                {/* <Section /> */}
                                {/* <Row>
                  <Widget />
                </Row> */}
                                {/* <Row>
                  <Col xl={8}>
                    <Revenue />
                  </Col>
                  <SalesByLocations />
                </Row> */}
                                <Row>
                                    Coin Graph Page
                                    {/* <TopSellers /> */}
                                </Row>
                                {/* <Row>
                  <StoreVisits />
                  <RecentOrders />
                </Row> */}
                            </div>
                        </Col>
                        {/* <RecentActivity /> */}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CoinGraph;
