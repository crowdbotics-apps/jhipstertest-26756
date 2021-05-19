import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './rule.reducer';
import { IRule } from 'app/shared/model/rule.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IRuleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Rule = (props: IRuleProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const [showSearch, setShowSearch] = useState(false);

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const formatDate = (date) => {
     const d = new Date(date);
     const datestring = d.getDate()  + "." + (d.getMonth()+1) + "." + d.getFullYear();
     return datestring;
  }

  const showSeachButton = () => {
    if(!showSearch) {
      return (
        <button onClick={() => {
          setShowSearch(true)
        }}><img className="small-icon" src='../../../content/images/img/icons/MagnifyingGlass.png' /></button>
      )
    } else {
      return (
        <div className="search-field-container">
          <img className="small-icon" src='../../../content/images/img/icons/MagnifyingGlass.png' />
          <input type="text" id="search-input" name="search-input" className="search-field" placeholder="Find in view"/>
          <div className="reset-input" onClick={() => {
              /* this.setState({ showSearch: false, searchValue: undefined });
              let _this = this;
              store.data.getRules().then((rules) => {
                console.log(rules);
                if(rules) {
                  _this.setState({
                    rules: rules.results
                  })
                }
              }); */
            }}><img className="small-icon" src='../../../content/images/img/icons/XCircle.png' /></div>
        </div>
      )
    }
  }

  const { ruleList, match, loading, totalItems } = props;
  return (
    <div className="container-padded">
      <h2 id="rule-heading" data-cy="RuleHeading">
        <Translate contentKey="apptestApp.rule.home.title">Rules</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="apptestApp.rule.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="apptestApp.rule.home.createLabel">Create new Rule</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {ruleList && ruleList.length > 0 ? (
          <>
          <div className="grid-toolbar">
            <button onClick={() => alert("Hide Fields available soon")}><img className="small-icon-left" src='../../../content/images/img/icons/EyeSlash.png' />Hide Fields</button>
            <button onClick={() => alert("Filter available soon")}><img className="small-icon-left" src='../../../content/images/img/icons/FunnelSimple.png' />Filter</button>
            <button onClick={() => alert("Sort... available soon")}><img className="small-icon-left" src='../../../content/images/img/icons/OpDa.png' />Sort</button>
            <button onClick={() => alert("More... available soon")}><img className="small-icon" src='../../../content/images/img/icons/DotsThreeOutline.png' /></button>
            {showSeachButton()}
            <button className="floated-right" onClick={() => alert("Calendar available soon")}><img className="small-icon-left" src='../../../content/images/img/icons/Calendar.png' />Access Date</button>
          </div>
            <Table responsive style={{marginBottom: 0}}>
              <thead className="grid-header">
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="apptestApp.rule.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('name')}>
                    <Translate contentKey="apptestApp.rule.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('clientTariffNumber')}>
                    <Translate contentKey="apptestApp.rule.clientTariffNumber">Client Tariff Number</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('ruleNumber')}>
                    <Translate contentKey="apptestApp.rule.ruleNumber">Rule Number</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('status')}>
                    <Translate contentKey="apptestApp.rule.status">Status</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('publisherName')}>
                    <Translate contentKey="apptestApp.rule.publisherName">Publisher Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>

            </Table>
            <div className="grid-container">
              { ruleList.map((item, i) => (
                <div key={i} className="grid-content" onClick={() => {
                  /* let _this = this;
                  setState({
                    showRuleText: true,
                    ruleText: item.rule_file
                  }, () => {
                    _getFile(item.rule_file)
                  }); */
                }}>
                  <b>{item.name}</b>
                  <table>
                    <thead>
                      <th>Company</th>
                      <th>Rule</th>
                      <th>Effective</th>
                      <th>Between</th>
                    </thead>
                    <tr>
                      <td>{item.clientTariffNumber ? item.clientTariffNumber : 'Company Name'}</td>
                      <td>Rule {item.ruleNumber}</td>
                      <td>{formatDate(item.effectiveDate)}</td>
                      <td>A and B</td>
                    </tr>
                  </table>
                </div>
              ))}
            </div>
          </>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="apptestApp.rule.home.notFound">No Rules found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={ruleList && ruleList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ rule }: IRootState) => ({
  ruleList: rule.entities,
  loading: rule.loading,
  totalItems: rule.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
