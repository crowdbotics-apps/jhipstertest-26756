package com.crowdbotics.apptest.repository;

import com.crowdbotics.apptest.domain.Rule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

/**
 * Spring Data SQL repository for the Rule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {
    Page<Rule> findByEffectiveDateLessThanEqualAndExpirationDateGreaterThanEqualOrEffectiveDateLessThanEqual(LocalDate localDate, LocalDate localDate1, LocalDate localDate2, Pageable pageable);
}
