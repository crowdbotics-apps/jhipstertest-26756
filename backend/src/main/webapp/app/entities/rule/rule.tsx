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

  const { ruleList, match, loading, totalItems } = props;
  return (
    <div>
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
            <Table responsive>
              <thead>
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
                  <th className="hand" onClick={sort('createdAt')}>
                    <Translate contentKey="apptestApp.rule.createdAt">Created At</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('updatedAt')}>
                    <Translate contentKey="apptestApp.rule.updatedAt">Updated At</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('effectiveDate')}>
                    <Translate contentKey="apptestApp.rule.effectiveDate">Effective Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('expirationDate')}>
                    <Translate contentKey="apptestApp.rule.expirationDate">Expiration Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('fileDate')}>
                    <Translate contentKey="apptestApp.rule.fileDate">File Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('fileAmendType')}>
                    <Translate contentKey="apptestApp.rule.fileAmendType">File Amend Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('formula')}>
                    <Translate contentKey="apptestApp.rule.formula">Formula</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('parentRule')}>
                    <Translate contentKey="apptestApp.rule.parentRule">Parent Rule</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('ruleText')}>
                    <Translate contentKey="apptestApp.rule.ruleText">Rule Text</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
            </Table>
            <div className="grid-container">
              { ruleList.map((item, i) => (
                <div key={i} className="grid-content" onClick={() => {
                  /* var _this = this;
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
