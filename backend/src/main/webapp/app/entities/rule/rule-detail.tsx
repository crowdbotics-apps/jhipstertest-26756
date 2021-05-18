import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './rule.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRuleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RuleDetail = (props: IRuleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { ruleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="ruleDetailsHeading">
          <Translate contentKey="apptestApp.rule.detail.title">Rule</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="apptestApp.rule.name">Name</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.name}</dd>
          <dt>
            <span id="clientTariffNumber">
              <Translate contentKey="apptestApp.rule.clientTariffNumber">Client Tariff Number</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.clientTariffNumber}</dd>
          <dt>
            <span id="ruleNumber">
              <Translate contentKey="apptestApp.rule.ruleNumber">Rule Number</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.ruleNumber}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="apptestApp.rule.status">Status</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.status}</dd>
          <dt>
            <span id="publisherName">
              <Translate contentKey="apptestApp.rule.publisherName">Publisher Name</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.publisherName}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="apptestApp.rule.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.createdAt ? <TextFormat value={ruleEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="apptestApp.rule.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.updatedAt ? <TextFormat value={ruleEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="effectiveDate">
              <Translate contentKey="apptestApp.rule.effectiveDate">Effective Date</Translate>
            </span>
          </dt>
          <dd>
            {ruleEntity.effectiveDate ? <TextFormat value={ruleEntity.effectiveDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="expirationDate">
              <Translate contentKey="apptestApp.rule.expirationDate">Expiration Date</Translate>
            </span>
          </dt>
          <dd>
            {ruleEntity.expirationDate ? <TextFormat value={ruleEntity.expirationDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="fileDate">
              <Translate contentKey="apptestApp.rule.fileDate">File Date</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.fileDate ? <TextFormat value={ruleEntity.fileDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="fileAmendType">
              <Translate contentKey="apptestApp.rule.fileAmendType">File Amend Type</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.fileAmendType}</dd>
          <dt>
            <span id="formula">
              <Translate contentKey="apptestApp.rule.formula">Formula</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.formula}</dd>
          <dt>
            <span id="parentRule">
              <Translate contentKey="apptestApp.rule.parentRule">Parent Rule</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.parentRule}</dd>
          <dt>
            <span id="ruleText">
              <Translate contentKey="apptestApp.rule.ruleText">Rule Text</Translate>
            </span>
          </dt>
          <dd>{ruleEntity.ruleText}</dd>
        </dl>
        <Button tag={Link} to="/rule" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/rule/${ruleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ rule }: IRootState) => ({
  ruleEntity: rule.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RuleDetail);
