import React from "react";
import { Col, Container, Row } from "reactstrap";
import GraphRowContainer from "./GraphRowContainer";

const CoinGraph = () => {
    document.title ="Meme Analyzer | Coin Graph";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row className="project-wrapper">
                        <Col>
                            <GraphRowContainer />
                            <GraphRowContainer />
                            <GraphRowContainer />
                            <GraphRowContainer />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CoinGraph;
