package ru.galandor.jsmartbot.repository;

import ru.galandor.jsmartbot.domain.CurrentItem;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CurrentItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CurrentItemRepository extends JpaRepository<CurrentItem, Long> {

}
