import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import { IRule } from 'app/shared/model/rule.model';

export interface IRuleModalProps {
  showModal: boolean;
  rule: IRule;
  handleClose: () => void;
}

class RuleModal extends React.Component<IRuleModalProps> {

  render() {
    const { handleClose } = this.props;

    const formatDate = (date) => {
       const d = new Date(date);
       const datestring = d.getDate()  + "." + (d.getMonth()+1) + "." + d.getFullYear();
       return datestring;
    }

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
        <AvForm>
          <ModalHeader id="login-title" data-cy="loginTitle" toggle={handleClose}>
            Rule Text
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <label>RULE TITLE</label>
                <div className="info">
                  <span>{this.props.rule.name}</span>
                </div>
                <label>COMPANY</label>
                <div className="info">
                  <span>{this.props.rule.clientTariffNumber}</span>
                </div>
                <label>RULE#</label>
                <div className="info">
                  <span>{this.props.rule.ruleNumber}</span>
                </div>
                <label>EFFECTIVE</label>
                <div className="info">
                  <span>{formatDate(this.props.rule.effectiveDate)}</span>
                </div>
                <label>EFFECTIVE</label>
                <div className="info" dangerouslySetInnerHTML={{__html: this.props.rule.ruleText}} />
              </Col>
            </Row>
            <div className="mt-1">&nbsp;</div>
          </ModalBody>
        </AvForm>
      </Modal>
    );
  }
}

export default RuleModal;
