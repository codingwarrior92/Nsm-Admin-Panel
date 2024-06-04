import React from "react";
import { Col, Container, Row } from "reactstrap";

const ClientSetting = () => {
    document.title ="Meme Analyzer | Client Settings";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="h-100">
                                <Row>
                                    Client Settings Page
                                </Row>
                            </div>
                        </Col>
                        {/* <RecentActivity /> */}
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ClientSetting;
