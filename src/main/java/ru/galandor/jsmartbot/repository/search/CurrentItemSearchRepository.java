package ru.galandor.jsmartbot.repository.search;

import ru.galandor.jsmartbot.domain.CurrentItem;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the CurrentItem entity.
 */
public interface CurrentItemSearchRepository extends ElasticsearchRepository<CurrentItem, Long> {
}
