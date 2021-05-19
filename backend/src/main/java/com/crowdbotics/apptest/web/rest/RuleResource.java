package com.crowdbotics.apptest.web.rest;

import com.crowdbotics.apptest.domain.Rule;
import com.crowdbotics.apptest.repository.RuleRepository;
import com.crowdbotics.apptest.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.crowdbotics.apptest.domain.Rule}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RuleResource {

    private final Logger log = LoggerFactory.getLogger(RuleResource.class);

    private static final String ENTITY_NAME = "rule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RuleRepository ruleRepository;

    public RuleResource(RuleRepository ruleRepository) {
        this.ruleRepository = ruleRepository;
    }

    /**
     * {@code POST  /rules} : Create a new rule.
     *
     * @param rule the rule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rule, or with status {@code 400 (Bad Request)} if the rule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rules")
    public ResponseEntity<Rule> createRule(@RequestBody Rule rule) throws URISyntaxException {
        log.debug("REST request to save Rule : {}", rule);
        if (rule.getId() != null) {
            throw new BadRequestAlertException("A new rule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rule result = ruleRepository.save(rule);
        return ResponseEntity
            .created(new URI("/api/rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rules/:id} : Updates an existing rule.
     *
     * @param id the id of the rule to save.
     * @param rule the rule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rule,
     * or with status {@code 400 (Bad Request)} if the rule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rules/{id}")
    public ResponseEntity<Rule> updateRule(@PathVariable(value = "id", required = false) final Long id, @RequestBody Rule rule)
        throws URISyntaxException {
        log.debug("REST request to update Rule : {}, {}", id, rule);
        if (rule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rule.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ruleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Rule result = ruleRepository.save(rule);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rule.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /rules/:id} : Partial updates given fields of an existing rule, field will ignore if it is null
     *
     * @param id the id of the rule to save.
     * @param rule the rule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rule,
     * or with status {@code 400 (Bad Request)} if the rule is not valid,
     * or with status {@code 404 (Not Found)} if the rule is not found,
     * or with status {@code 500 (Internal Server Error)} if the rule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/rules/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Rule> partialUpdateRule(@PathVariable(value = "id", required = false) final Long id, @RequestBody Rule rule)
        throws URISyntaxException {
        log.debug("REST request to partial update Rule partially : {}, {}", id, rule);
        if (rule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rule.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ruleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Rule> result = ruleRepository
            .findById(rule.getId())
            .map(
                existingRule -> {
                    if (rule.getName() != null) {
                        existingRule.setName(rule.getName());
                    }
                    if (rule.getClientTariffNumber() != null) {
                        existingRule.setClientTariffNumber(rule.getClientTariffNumber());
                    }
                    if (rule.getRuleNumber() != null) {
                        existingRule.setRuleNumber(rule.getRuleNumber());
                    }
                    if (rule.getStatus() != null) {
                        existingRule.setStatus(rule.getStatus());
                    }
                    if (rule.getPublisherName() != null) {
                        existingRule.setPublisherName(rule.getPublisherName());
                    }
                    if (rule.getCreatedAt() != null) {
                        existingRule.setCreatedAt(rule.getCreatedAt());
                    }
                    if (rule.getUpdatedAt() != null) {
                        existingRule.setUpdatedAt(rule.getUpdatedAt());
                    }
                    if (rule.getEffectiveDate() != null) {
                        existingRule.setEffectiveDate(rule.getEffectiveDate());
                    }
                    if (rule.getExpirationDate() != null) {
                        existingRule.setExpirationDate(rule.getExpirationDate());
                    }
                    if (rule.getFileDate() != null) {
                        existingRule.setFileDate(rule.getFileDate());
                    }
                    if (rule.getFileAmendType() != null) {
                        existingRule.setFileAmendType(rule.getFileAmendType());
                    }
                    if (rule.getFormula() != null) {
                        existingRule.setFormula(rule.getFormula());
                    }
                    if (rule.getParentRule() != null) {
                        existingRule.setParentRule(rule.getParentRule());
                    }
                    if (rule.getRuleText() != null) {
                        existingRule.setRuleText(rule.getRuleText());
                    }

                    return existingRule;
                }
            )
            .map(ruleRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rule.getId().toString())
        );
    }

    /**
     * {@code GET  /rules} : get all the rules.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rules in body.
     */
    @GetMapping("/rules")
    public ResponseEntity<List<Rule>> getAllRules(@RequestParam String accessDate, Pageable pageable) {
        log.debug("REST request to get a page of Rules " + accessDate);

        Page<Rule> page = null;
        if(accessDate != null && !accessDate.equals("undefined")) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate localDate = LocalDate.parse(accessDate, formatter);
                page = ruleRepository.findAllByAccessDate(localDate, pageable);
            } catch (Exception ex) {
                page = ruleRepository.findAll(pageable);
            }
        } else {
            page = ruleRepository.findAll(pageable);
        }

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /rules/:id} : get the "id" rule.
     *
     * @param id the id of the rule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rules/{id}")
    public ResponseEntity<Rule> getRule(@PathVariable Long id) {
        log.debug("REST request to get Rule : {}", id);
        Optional<Rule> rule = ruleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rule);
    }

    /**
     * {@code DELETE  /rules/:id} : delete the "id" rule.
     *
     * @param id the id of the rule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rules/{id}")
    public ResponseEntity<Void> deleteRule(@PathVariable Long id) {
        log.debug("REST request to delete Rule : {}", id);
        ruleRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
