import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { getClientLists } from '../../helpers/backend_helper';


const ClientSetting = () => {
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getClientLists();
      setClientList(response);
    }
    fetchData();
  }, []);

  document.title = "Dashboard | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Col>
          <Card>
            <CardHeader className="align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">Client Settings</h4>
            </CardHeader>

            <CardBody>
              <div className="table-responsive table-card">
                <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                  <thead className="text-muted table-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Twitter ID</th>
                      <th scope="col">Website</th>
                      <th scope="col">Telegram ID</th>
                      <th scope="col">Twitter Followers</th>
                      <th scope="col">Telegram Subscribers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(clientList || []).map((item, key) => (
                      <tr key={key}>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">{item.id}</h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">{item.name}</h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">{item.twitter_id}</h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">{item.website}</h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">{item.telegram_id}</h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">{item.twitter_followers}</h5>
                        </td>
                        <td>
                          <h5 className="fs-14 my-1 fw-normal">{item.telegram_subscribers}</h5>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    </React.Fragment>
  );
};

export default ClientSetting;