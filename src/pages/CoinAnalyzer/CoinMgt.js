import React, { useEffect, useState, useRef } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { Player } from "@lordicon/react";
import ReactPaginate from 'react-paginate';
import { getMemeLists, getSelectedCoins, updateSelectedCoins } from "../../helpers/backend_helper";
const msoeawqm = require('../../assets/images/common/msoeawqm.json');

const CoinMgt = () => {
  document.title = "Meme Analyzer | Coin Management";

  const [page, setPage] = useState(0);
  const [coinList, setCoinList] = useState([]);
  const [numTokens, setNumTokens] = useState(0);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [keyword, setKeyword] = useState('');
  const msoeawqmRef = useRef(null);
  const handleOnChange = (event) => {
    setKeyword(event.target.value);
  }

  useEffect(() => {
    msoeawqmRef.current?.playFromBeginning();
  }, [])
  useEffect(() => {
    async function fetchData() {
      const response = await getMemeLists({
        'start': 0 + page * 100,
        'limit': 100,
        'keyword': keyword
      });
      const num_tokens = Math.ceil(response.data.stats.total / 100);
      setNumTokens(num_tokens);
      setCoinList(response.data.coins);

      const resp = await getSelectedCoins();
      console.log(resp)
      setSelectedCoins(resp);

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    fetchData();
  }, [page, keyword]);

  const handlePageClick = (event) => {
    setPage(event.selected);
  }

  const handleCheckBox = async (coin_id) => {
    const resp = await updateSelectedCoins({coin_id});
    setSelectedCoins(resp);
  }

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
                            <input type="text" className="form-control search" placeholder="Search..." value={keyword} onChange={handleOnChange}/>
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
                              <th scope="col" style={{ width: "50px" }}>
                                <div className="form-check">
                                  {/* <input className="form-check-input" type="checkbox" id="checkAll" value="option" /> */}
                                </div>
                              </th>
                              <th className="sort" data-sort="#">#</th>
                              <th className="sort" data-sort="name">Name</th>
                              <th className="sort" data-sort="symbol">Symbol</th>
                              <th className="sort" data-sort="price">Price</th>
                              <th className="sort" data-sort="market_cap">Market Cap</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {(coinList || []).map((item, key) => (
                              <tr key={key}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      onChange={() => handleCheckBox(item.uuid)}
                                      checked={selectedCoins.some(({coin_id}) => coin_id === item.uuid)}
                                      value={key}
                                    />
                                  </div>
                                </th>
                                <td className="id">{item.uuid}</td>
                                <td className="name">
                                  <div class="d-flex align-items-center">
                                    <div class="me-2">
                                      <img src={item.iconUrl} class="avatar-xxs"/>
                                    </div>
                                    <div>
                                      <h6 class="fs-14 mb-0">{item.name}</h6>
                                    </div>
                                  </div>

                                </td>
                                <td className="symbol">{item.symbol}</td>
                                <td className="price">${item.price}</td>
                                <td className="market_cap">${item.marketCap}</td>
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
                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <ReactPaginate
                          breakLabel="..."
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={1}
                          className={'pagination'}
                          pageClassName={'paginate_button page-item'}
                          pageLinkClassName={'page-link'}
                          breakClassName={'paginate_button page-item'}
                          breakLinkClassName={'page-link'}
                          previousLinkClassName={'page-link'}
                          nextLinkClassName={'page-link'}
                          activeClassName={'active'}
                          previousClassName={'paginate_button page-item previous'}
                          nextClassName={'paginate_button page-item next'}
                          pageCount={numTokens}
                          renderOnZeroPageCount={null}
                        />
                      </div>
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
