package com.crowdbotics.apptest.web.rest;

import static com.crowdbotics.apptest.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.crowdbotics.apptest.IntegrationTest;
import com.crowdbotics.apptest.domain.Rule;
import com.crowdbotics.apptest.repository.RuleRepository;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link RuleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class RuleResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CLIENT_TARIFF_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_CLIENT_TARIFF_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_RULE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_RULE_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final String DEFAULT_PUBLISHER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PUBLISHER_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_UPDATED_AT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_UPDATED_AT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final LocalDate DEFAULT_EFFECTIVE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EFFECTIVE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_EXPIRATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRATION_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FILE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FILE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_FILE_AMEND_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_FILE_AMEND_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_FORMULA = "AAAAAAAAAA";
    private static final String UPDATED_FORMULA = "BBBBBBBBBB";

    private static final Long DEFAULT_PARENT_RULE = 1L;
    private static final Long UPDATED_PARENT_RULE = 2L;

    private static final String DEFAULT_RULE_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_RULE_TEXT = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/rules";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private RuleRepository ruleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRuleMockMvc;

    private Rule rule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rule createEntity(EntityManager em) {
        Rule rule = new Rule()
            .name(DEFAULT_NAME)
            .clientTariffNumber(DEFAULT_CLIENT_TARIFF_NUMBER)
            .ruleNumber(DEFAULT_RULE_NUMBER)
            .status(DEFAULT_STATUS)
            .publisherName(DEFAULT_PUBLISHER_NAME)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT)
            .effectiveDate(DEFAULT_EFFECTIVE_DATE)
            .expirationDate(DEFAULT_EXPIRATION_DATE)
            .fileDate(DEFAULT_FILE_DATE)
            .fileAmendType(DEFAULT_FILE_AMEND_TYPE)
            .formula(DEFAULT_FORMULA)
            .parentRule(DEFAULT_PARENT_RULE)
            .ruleText(DEFAULT_RULE_TEXT);
        return rule;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rule createUpdatedEntity(EntityManager em) {
        Rule rule = new Rule()
            .name(UPDATED_NAME)
            .clientTariffNumber(UPDATED_CLIENT_TARIFF_NUMBER)
            .ruleNumber(UPDATED_RULE_NUMBER)
            .status(UPDATED_STATUS)
            .publisherName(UPDATED_PUBLISHER_NAME)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT)
            .effectiveDate(UPDATED_EFFECTIVE_DATE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .fileDate(UPDATED_FILE_DATE)
            .fileAmendType(UPDATED_FILE_AMEND_TYPE)
            .formula(UPDATED_FORMULA)
            .parentRule(UPDATED_PARENT_RULE)
            .ruleText(UPDATED_RULE_TEXT);
        return rule;
    }

    @BeforeEach
    public void initTest() {
        rule = createEntity(em);
    }

    @Test
    @Transactional
    void createRule() throws Exception {
        int databaseSizeBeforeCreate = ruleRepository.findAll().size();
        // Create the Rule
        restRuleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isCreated());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeCreate + 1);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRule.getClientTariffNumber()).isEqualTo(DEFAULT_CLIENT_TARIFF_NUMBER);
        assertThat(testRule.getRuleNumber()).isEqualTo(DEFAULT_RULE_NUMBER);
        assertThat(testRule.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testRule.getPublisherName()).isEqualTo(DEFAULT_PUBLISHER_NAME);
        assertThat(testRule.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testRule.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
        assertThat(testRule.getEffectiveDate()).isEqualTo(DEFAULT_EFFECTIVE_DATE);
        assertThat(testRule.getExpirationDate()).isEqualTo(DEFAULT_EXPIRATION_DATE);
        assertThat(testRule.getFileDate()).isEqualTo(DEFAULT_FILE_DATE);
        assertThat(testRule.getFileAmendType()).isEqualTo(DEFAULT_FILE_AMEND_TYPE);
        assertThat(testRule.getFormula()).isEqualTo(DEFAULT_FORMULA);
        assertThat(testRule.getParentRule()).isEqualTo(DEFAULT_PARENT_RULE);
        assertThat(testRule.getRuleText()).isEqualTo(DEFAULT_RULE_TEXT);
    }

    @Test
    @Transactional
    void createRuleWithExistingId() throws Exception {
        // Create the Rule with an existing ID
        rule.setId(1L);

        int databaseSizeBeforeCreate = ruleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restRuleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllRules() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        // Get all the ruleList
        restRuleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rule.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].clientTariffNumber").value(hasItem(DEFAULT_CLIENT_TARIFF_NUMBER)))
            .andExpect(jsonPath("$.[*].ruleNumber").value(hasItem(DEFAULT_RULE_NUMBER)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].publisherName").value(hasItem(DEFAULT_PUBLISHER_NAME)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(sameInstant(DEFAULT_CREATED_AT))))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(sameInstant(DEFAULT_UPDATED_AT))))
            .andExpect(jsonPath("$.[*].effectiveDate").value(hasItem(DEFAULT_EFFECTIVE_DATE.toString())))
            .andExpect(jsonPath("$.[*].expirationDate").value(hasItem(DEFAULT_EXPIRATION_DATE.toString())))
            .andExpect(jsonPath("$.[*].fileDate").value(hasItem(DEFAULT_FILE_DATE.toString())))
            .andExpect(jsonPath("$.[*].fileAmendType").value(hasItem(DEFAULT_FILE_AMEND_TYPE)))
            .andExpect(jsonPath("$.[*].formula").value(hasItem(DEFAULT_FORMULA.toString())))
            .andExpect(jsonPath("$.[*].parentRule").value(hasItem(DEFAULT_PARENT_RULE.intValue())))
            .andExpect(jsonPath("$.[*].ruleText").value(hasItem(DEFAULT_RULE_TEXT.toString())));
    }

    @Test
    @Transactional
    void getRule() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        // Get the rule
        restRuleMockMvc
            .perform(get(ENTITY_API_URL_ID, rule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rule.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.clientTariffNumber").value(DEFAULT_CLIENT_TARIFF_NUMBER))
            .andExpect(jsonPath("$.ruleNumber").value(DEFAULT_RULE_NUMBER))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.publisherName").value(DEFAULT_PUBLISHER_NAME))
            .andExpect(jsonPath("$.createdAt").value(sameInstant(DEFAULT_CREATED_AT)))
            .andExpect(jsonPath("$.updatedAt").value(sameInstant(DEFAULT_UPDATED_AT)))
            .andExpect(jsonPath("$.effectiveDate").value(DEFAULT_EFFECTIVE_DATE.toString()))
            .andExpect(jsonPath("$.expirationDate").value(DEFAULT_EXPIRATION_DATE.toString()))
            .andExpect(jsonPath("$.fileDate").value(DEFAULT_FILE_DATE.toString()))
            .andExpect(jsonPath("$.fileAmendType").value(DEFAULT_FILE_AMEND_TYPE))
            .andExpect(jsonPath("$.formula").value(DEFAULT_FORMULA.toString()))
            .andExpect(jsonPath("$.parentRule").value(DEFAULT_PARENT_RULE.intValue()))
            .andExpect(jsonPath("$.ruleText").value(DEFAULT_RULE_TEXT.toString()));
    }

    @Test
    @Transactional
    void getNonExistingRule() throws Exception {
        // Get the rule
        restRuleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewRule() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();

        // Update the rule
        Rule updatedRule = ruleRepository.findById(rule.getId()).get();
        // Disconnect from session so that the updates on updatedRule are not directly saved in db
        em.detach(updatedRule);
        updatedRule
            .name(UPDATED_NAME)
            .clientTariffNumber(UPDATED_CLIENT_TARIFF_NUMBER)
            .ruleNumber(UPDATED_RULE_NUMBER)
            .status(UPDATED_STATUS)
            .publisherName(UPDATED_PUBLISHER_NAME)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT)
            .effectiveDate(UPDATED_EFFECTIVE_DATE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .fileDate(UPDATED_FILE_DATE)
            .fileAmendType(UPDATED_FILE_AMEND_TYPE)
            .formula(UPDATED_FORMULA)
            .parentRule(UPDATED_PARENT_RULE)
            .ruleText(UPDATED_RULE_TEXT);

        restRuleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedRule.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedRule))
            )
            .andExpect(status().isOk());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRule.getClientTariffNumber()).isEqualTo(UPDATED_CLIENT_TARIFF_NUMBER);
        assertThat(testRule.getRuleNumber()).isEqualTo(UPDATED_RULE_NUMBER);
        assertThat(testRule.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testRule.getPublisherName()).isEqualTo(UPDATED_PUBLISHER_NAME);
        assertThat(testRule.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRule.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testRule.getEffectiveDate()).isEqualTo(UPDATED_EFFECTIVE_DATE);
        assertThat(testRule.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testRule.getFileDate()).isEqualTo(UPDATED_FILE_DATE);
        assertThat(testRule.getFileAmendType()).isEqualTo(UPDATED_FILE_AMEND_TYPE);
        assertThat(testRule.getFormula()).isEqualTo(UPDATED_FORMULA);
        assertThat(testRule.getParentRule()).isEqualTo(UPDATED_PARENT_RULE);
        assertThat(testRule.getRuleText()).isEqualTo(UPDATED_RULE_TEXT);
    }

    @Test
    @Transactional
    void putNonExistingRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, rule.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rule))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(rule))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateRuleWithPatch() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();

        // Update the rule using partial update
        Rule partialUpdatedRule = new Rule();
        partialUpdatedRule.setId(rule.getId());

        partialUpdatedRule
            .name(UPDATED_NAME)
            .clientTariffNumber(UPDATED_CLIENT_TARIFF_NUMBER)
            .ruleNumber(UPDATED_RULE_NUMBER)
            .status(UPDATED_STATUS)
            .publisherName(UPDATED_PUBLISHER_NAME)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT)
            .effectiveDate(UPDATED_EFFECTIVE_DATE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .fileAmendType(UPDATED_FILE_AMEND_TYPE)
            .parentRule(UPDATED_PARENT_RULE);

        restRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRule.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRule))
            )
            .andExpect(status().isOk());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRule.getClientTariffNumber()).isEqualTo(UPDATED_CLIENT_TARIFF_NUMBER);
        assertThat(testRule.getRuleNumber()).isEqualTo(UPDATED_RULE_NUMBER);
        assertThat(testRule.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testRule.getPublisherName()).isEqualTo(UPDATED_PUBLISHER_NAME);
        assertThat(testRule.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRule.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testRule.getEffectiveDate()).isEqualTo(UPDATED_EFFECTIVE_DATE);
        assertThat(testRule.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testRule.getFileDate()).isEqualTo(DEFAULT_FILE_DATE);
        assertThat(testRule.getFileAmendType()).isEqualTo(UPDATED_FILE_AMEND_TYPE);
        assertThat(testRule.getFormula()).isEqualTo(DEFAULT_FORMULA);
        assertThat(testRule.getParentRule()).isEqualTo(UPDATED_PARENT_RULE);
        assertThat(testRule.getRuleText()).isEqualTo(DEFAULT_RULE_TEXT);
    }

    @Test
    @Transactional
    void fullUpdateRuleWithPatch() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();

        // Update the rule using partial update
        Rule partialUpdatedRule = new Rule();
        partialUpdatedRule.setId(rule.getId());

        partialUpdatedRule
            .name(UPDATED_NAME)
            .clientTariffNumber(UPDATED_CLIENT_TARIFF_NUMBER)
            .ruleNumber(UPDATED_RULE_NUMBER)
            .status(UPDATED_STATUS)
            .publisherName(UPDATED_PUBLISHER_NAME)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT)
            .effectiveDate(UPDATED_EFFECTIVE_DATE)
            .expirationDate(UPDATED_EXPIRATION_DATE)
            .fileDate(UPDATED_FILE_DATE)
            .fileAmendType(UPDATED_FILE_AMEND_TYPE)
            .formula(UPDATED_FORMULA)
            .parentRule(UPDATED_PARENT_RULE)
            .ruleText(UPDATED_RULE_TEXT);

        restRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedRule.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedRule))
            )
            .andExpect(status().isOk());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
        Rule testRule = ruleList.get(ruleList.size() - 1);
        assertThat(testRule.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRule.getClientTariffNumber()).isEqualTo(UPDATED_CLIENT_TARIFF_NUMBER);
        assertThat(testRule.getRuleNumber()).isEqualTo(UPDATED_RULE_NUMBER);
        assertThat(testRule.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testRule.getPublisherName()).isEqualTo(UPDATED_PUBLISHER_NAME);
        assertThat(testRule.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testRule.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
        assertThat(testRule.getEffectiveDate()).isEqualTo(UPDATED_EFFECTIVE_DATE);
        assertThat(testRule.getExpirationDate()).isEqualTo(UPDATED_EXPIRATION_DATE);
        assertThat(testRule.getFileDate()).isEqualTo(UPDATED_FILE_DATE);
        assertThat(testRule.getFileAmendType()).isEqualTo(UPDATED_FILE_AMEND_TYPE);
        assertThat(testRule.getFormula()).isEqualTo(UPDATED_FORMULA);
        assertThat(testRule.getParentRule()).isEqualTo(UPDATED_PARENT_RULE);
        assertThat(testRule.getRuleText()).isEqualTo(UPDATED_RULE_TEXT);
    }

    @Test
    @Transactional
    void patchNonExistingRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, rule.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rule))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(rule))
            )
            .andExpect(status().isBadRequest());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamRule() throws Exception {
        int databaseSizeBeforeUpdate = ruleRepository.findAll().size();
        rule.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restRuleMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(rule)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Rule in the database
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteRule() throws Exception {
        // Initialize the database
        ruleRepository.saveAndFlush(rule);

        int databaseSizeBeforeDelete = ruleRepository.findAll().size();

        // Delete the rule
        restRuleMockMvc
            .perform(delete(ENTITY_API_URL_ID, rule.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rule> ruleList = ruleRepository.findAll();
        assertThat(ruleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
