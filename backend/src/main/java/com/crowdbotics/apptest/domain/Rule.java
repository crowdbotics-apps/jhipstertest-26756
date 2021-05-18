package com.crowdbotics.apptest.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.persistence.*;
import org.hibernate.annotations.Type;

/**
 * A Rule.
 */
@Entity
@Table(name = "rule")
public class Rule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "client_tariff_number")
    private String clientTariffNumber;

    @Column(name = "rule_number")
    private String ruleNumber;

    @Column(name = "status")
    private String status;

    @Column(name = "publisher_name")
    private String publisherName;

    @Column(name = "created_at")
    private ZonedDateTime createdAt;

    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @Column(name = "effective_date")
    private LocalDate effectiveDate;

    @Column(name = "expiration_date")
    private LocalDate expirationDate;

    @Column(name = "file_date")
    private LocalDate fileDate;

    @Column(name = "file_amend_type")
    private String fileAmendType;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "formula")
    private String formula;

    @Column(name = "parent_rule")
    private Long parentRule;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "rule_text")
    private String ruleText;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Rule id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public Rule name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClientTariffNumber() {
        return this.clientTariffNumber;
    }

    public Rule clientTariffNumber(String clientTariffNumber) {
        this.clientTariffNumber = clientTariffNumber;
        return this;
    }

    public void setClientTariffNumber(String clientTariffNumber) {
        this.clientTariffNumber = clientTariffNumber;
    }

    public String getRuleNumber() {
        return this.ruleNumber;
    }

    public Rule ruleNumber(String ruleNumber) {
        this.ruleNumber = ruleNumber;
        return this;
    }

    public void setRuleNumber(String ruleNumber) {
        this.ruleNumber = ruleNumber;
    }

    public String getStatus() {
        return this.status;
    }

    public Rule status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPublisherName() {
        return this.publisherName;
    }

    public Rule publisherName(String publisherName) {
        this.publisherName = publisherName;
        return this;
    }

    public void setPublisherName(String publisherName) {
        this.publisherName = publisherName;
    }

    public ZonedDateTime getCreatedAt() {
        return this.createdAt;
    }

    public Rule createdAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public Rule updatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDate getEffectiveDate() {
        return this.effectiveDate;
    }

    public Rule effectiveDate(LocalDate effectiveDate) {
        this.effectiveDate = effectiveDate;
        return this;
    }

    public void setEffectiveDate(LocalDate effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public LocalDate getExpirationDate() {
        return this.expirationDate;
    }

    public Rule expirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
        return this;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public LocalDate getFileDate() {
        return this.fileDate;
    }

    public Rule fileDate(LocalDate fileDate) {
        this.fileDate = fileDate;
        return this;
    }

    public void setFileDate(LocalDate fileDate) {
        this.fileDate = fileDate;
    }

    public String getFileAmendType() {
        return this.fileAmendType;
    }

    public Rule fileAmendType(String fileAmendType) {
        this.fileAmendType = fileAmendType;
        return this;
    }

    public void setFileAmendType(String fileAmendType) {
        this.fileAmendType = fileAmendType;
    }

    public String getFormula() {
        return this.formula;
    }

    public Rule formula(String formula) {
        this.formula = formula;
        return this;
    }

    public void setFormula(String formula) {
        this.formula = formula;
    }

    public Long getParentRule() {
        return this.parentRule;
    }

    public Rule parentRule(Long parentRule) {
        this.parentRule = parentRule;
        return this;
    }

    public void setParentRule(Long parentRule) {
        this.parentRule = parentRule;
    }

    public String getRuleText() {
        return this.ruleText;
    }

    public Rule ruleText(String ruleText) {
        this.ruleText = ruleText;
        return this;
    }

    public void setRuleText(String ruleText) {
        this.ruleText = ruleText;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Rule)) {
            return false;
        }
        return id != null && id.equals(((Rule) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rule{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", clientTariffNumber='" + getClientTariffNumber() + "'" +
            ", ruleNumber='" + getRuleNumber() + "'" +
            ", status='" + getStatus() + "'" +
            ", publisherName='" + getPublisherName() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", effectiveDate='" + getEffectiveDate() + "'" +
            ", expirationDate='" + getExpirationDate() + "'" +
            ", fileDate='" + getFileDate() + "'" +
            ", fileAmendType='" + getFileAmendType() + "'" +
            ", formula='" + getFormula() + "'" +
            ", parentRule=" + getParentRule() +
            ", ruleText='" + getRuleText() + "'" +
            "}";
    }
}
