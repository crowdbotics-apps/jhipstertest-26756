package com.crowdbotics.apptest.repository;

import com.crowdbotics.apptest.domain.Rule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

/**
 * Spring Data SQL repository for the Rule entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RuleRepository extends JpaRepository<Rule, Long> {

    @Query("select a from Rule a where (a.effectiveDate <= :accessDate and a.expirationDate > :accessDate) or (a.effectiveDate <= :accessDate and a.expirationDate = null)")
    Page<Rule> findAllByAccessDate(
        @Param("accessDate") LocalDate accessDate, Pageable pageable);
}
