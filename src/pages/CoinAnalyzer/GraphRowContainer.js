import React, { useState, useEffect } from "react";
import { Col, Card, CardHeader, CardBody, Container, Row } from "reactstrap";
import {RowChart} from "./RowChart";
import CountUp from "react-countup";
import {useSelector} from "react-redux";

const GraphRowContainer = () => {
    const [chartData, setchartData] = useState([]);

    // mock chart data
    const allCoinData = [{
        name: 'Number of Projects',
        type: 'bar',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
    }, {
        name: 'Revenue',
        type: 'area',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
    }, {
        name: 'Active Projects',
        type: 'bar',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
    }];
    const { projectData } = useSelector(state => ({
        projectData: allCoinData
    }));

    useEffect(() => {
        setchartData(projectData);
    }, [projectData]);
    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>
                    <Card>
                        <CardHeader className="border-0 align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Doge Coin</h4>
                            <div className="d-flex gap-1">

                            </div>
                        </CardHeader>
                        <CardHeader className="p-0 border-0 bg-soft-light">
                            <Row className="g-0 text-center">
                                <Col xs={6} sm={3}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1"><span className="counter-value" data-target="9851">
                                            <CountUp
                                                start={0}
                                                end={9851}
                                                separator={","}
                                                duration={4}
                                            />
                                        </span></h5>
                                        <p className="text-muted mb-0">Number of Projects</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={3}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1"><span className="counter-value">
                                            <CountUp
                                                start={0}
                                                end={1026}
                                                separator={","}
                                                duration={4}
                                            />
                                        </span></h5>
                                        <p className="text-muted mb-0">Active Projects</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={3}>
                                    <div className="p-3 border border-dashed border-start-0">
                                        <h5 className="mb-1">$<span className="counter-value" data-target="228.89">
                                            <CountUp
                                                start={0}
                                                end={228.89}
                                                decimals={2}
                                                duration={4}
                                            />
                                        </span>k</h5>
                                        <p className="text-muted mb-0">Revenue</p>
                                    </div>
                                </Col>
                                <Col xs={6} sm={3}>
                                    <div className="p-3 border border-dashed border-start-0 border-end-0">
                                        <h5 className="mb-1 text-success"><span className="counter-value" data-target="10589">
                                            <CountUp
                                                start={0}
                                                end={10589}
                                                separator={","}
                                                duration={4}
                                            />
                                        </span>h</h5>
                                        <p className="text-muted mb-0">Working Hours</p>
                                    </div>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody className="p-0 pb-2">
                            <div>
                                <div dir="ltr" className="apex-charts">
                                    <RowChart series={chartData} dataColors='["--vz-primary", "--vz-warning", "--vz-success"]' />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default GraphRowContainer;
