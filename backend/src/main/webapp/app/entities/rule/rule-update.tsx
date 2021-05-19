import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { setFileData, byteSize, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './rule.reducer';
import { IRule } from 'app/shared/model/rule.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRuleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RuleUpdate = (props: IRuleUpdateProps) => {
  const [isNew, setNew] = useState(!props.match.params || !props.match.params.id);
  const [olderRule, setOlderRule] = useState(null);

  const { ruleEntity, loading, updating } = props;

  const { formula, ruleText } = ruleEntity;

  const handleClose = () => {
    props.history.push('/rule' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const entity = {
        ...ruleEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const searchOlderRule = () => {
    props.getEntity(parseInt(olderRule, 2));

  }

  const setOldRuleValue = (event, value) => {
      setOlderRule(value);
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="apptestApp.rule.home.createOrEditLabel" data-cy="RuleCreateUpdateHeading">
            <Translate contentKey="apptestApp.rule.home.createOrEditLabel">Create or edit a Rule</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ruleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="rule-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="rule-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : (
                <AvGroup>
                  <Label id="parentRuleLabel" for="rule-parentRule">
                    <Translate contentKey="apptestApp.rule.parentRule">Parent Rule</Translate>
                  </Label>
                  <Row>
                    <Col md="11">
                      <AvField value={ruleEntity ? props.ruleEntity.id : ''} onChange={(event, value) => setOldRuleValue(event, value)} placeholder={'Copy older Rule data (search by ID)'} id="rule-parentRule" data-cy="parentRule" type="string" className="form-control" name="parentRule" />
                    </Col>
                    <Col md="1">
                      <div className="white-button" onClick={() => {
                        searchOlderRule()
                      }}><img className="small-icon" src='../../../content/images/img/icons/MagnifyingGlass.png' /></div>
                    </Col>
                  </Row>
                </AvGroup>
              )}
              <AvGroup>
                <Label id="nameLabel" for="rule-name">
                  <Translate contentKey="apptestApp.rule.name">Name</Translate>
                </Label>
                <AvField value={ruleEntity ? props.ruleEntity.name : ''} id="rule-name" data-cy="name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="clientTariffNumberLabel" for="rule-clientTariffNumber">
                  <Translate contentKey="apptestApp.rule.clientTariffNumber">Client Tariff Number</Translate>
                </Label>
                <AvField value={ruleEntity ? props.ruleEntity.clientTariffNumber : ''} id="rule-clientTariffNumber" data-cy="clientTariffNumber" type="text" name="clientTariffNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="ruleNumberLabel" for="rule-ruleNumber">
                  <Translate contentKey="apptestApp.rule.ruleNumber">Rule Number</Translate>
                </Label>
                <AvField value={ruleEntity ? props.ruleEntity.ruleNumber : ''} id="rule-ruleNumber" data-cy="ruleNumber" type="text" name="ruleNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="rule-status">
                  <Translate contentKey="apptestApp.rule.status">Status</Translate>
                </Label>
                <AvField value={ruleEntity ? props.ruleEntity.status : ''}  id="rule-status" data-cy="status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="publisherNameLabel" for="rule-publisherName">
                  <Translate contentKey="apptestApp.rule.publisherName">Publisher Name</Translate>
                </Label>
                <AvField value={ruleEntity ? props.ruleEntity.publisherName : ''} id="rule-publisherName" data-cy="publisherName" type="text" name="publisherName" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="rule-createdAt">
                  <Translate contentKey="apptestApp.rule.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="rule-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.ruleEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="rule-updatedAt">
                  <Translate contentKey="apptestApp.rule.updatedAt">Updated At</Translate>
                </Label>
                <AvInput
                  id="rule-updatedAt"
                  data-cy="updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.ruleEntity.updatedAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="effectiveDateLabel" for="rule-effectiveDate">
                  <Translate contentKey="apptestApp.rule.effectiveDate">Effective Date</Translate>
                </Label>
                <AvField id="rule-effectiveDate" data-cy="effectiveDate" type="date" className="form-control" name="effectiveDate" />
              </AvGroup>
              <AvGroup>
                <Label id="expirationDateLabel" for="rule-expirationDate">
                  <Translate contentKey="apptestApp.rule.expirationDate">Expiration Date</Translate>
                </Label>
                <AvField id="rule-expirationDate" data-cy="expirationDate" type="date" className="form-control" name="expirationDate" />
              </AvGroup>
              <AvGroup>
                <Label id="fileDateLabel" for="rule-fileDate">
                  <Translate contentKey="apptestApp.rule.fileDate">File Date</Translate>
                </Label>
                <AvField id="rule-fileDate" data-cy="fileDate" type="date" className="form-control" name="fileDate" />
              </AvGroup>
              <AvGroup>
                <Label id="fileAmendTypeLabel" for="rule-fileAmendType">
                  <Translate contentKey="apptestApp.rule.fileAmendType">File Amend Type</Translate>
                </Label>
                <AvField value={ruleEntity ? props.ruleEntity.fileAmendType : ''} id="rule-fileAmendType" data-cy="fileAmendType" type="text" name="fileAmendType" />
              </AvGroup>
              <AvGroup>
                <Label id="formulaLabel" for="rule-formula">
                  <Translate contentKey="apptestApp.rule.formula">Formula</Translate>
                </Label>
                <AvInput value={ruleEntity ? props.ruleEntity.formula : ''} id="rule-formula" data-cy="formula" type="textarea" name="formula" />
              </AvGroup>
              <AvGroup>
                <Label id="ruleTextLabel" for="rule-ruleText">
                  <Translate contentKey="apptestApp.rule.ruleText">Rule Text</Translate>
                </Label>
                <AvInput value={ruleEntity ? props.ruleEntity.ruleText : ''} id="rule-ruleText" data-cy="ruleText" type="textarea" name="ruleText" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/rule" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  ruleEntity: storeState.rule.entity,
  loading: storeState.rule.loading,
  updating: storeState.rule.updating,
  updateSuccess: storeState.rule.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RuleUpdate);
