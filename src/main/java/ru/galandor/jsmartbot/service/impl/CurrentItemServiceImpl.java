package ru.galandor.jsmartbot.service.impl;

import ru.galandor.jsmartbot.service.CurrentItemService;
import ru.galandor.jsmartbot.domain.CurrentItem;
import ru.galandor.jsmartbot.repository.CurrentItemRepository;
import ru.galandor.jsmartbot.repository.search.CurrentItemSearchRepository;
import ru.galandor.jsmartbot.service.dto.CurrentItemDTO;
import ru.galandor.jsmartbot.service.mapper.CurrentItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing CurrentItem.
 */
@Service
@Transactional
public class CurrentItemServiceImpl implements CurrentItemService{

    private final Logger log = LoggerFactory.getLogger(CurrentItemServiceImpl.class);

    private final CurrentItemRepository currentItemRepository;

    private final CurrentItemMapper currentItemMapper;

    private final CurrentItemSearchRepository currentItemSearchRepository;

    public CurrentItemServiceImpl(CurrentItemRepository currentItemRepository, CurrentItemMapper currentItemMapper, CurrentItemSearchRepository currentItemSearchRepository) {
        this.currentItemRepository = currentItemRepository;
        this.currentItemMapper = currentItemMapper;
        this.currentItemSearchRepository = currentItemSearchRepository;
    }

    /**
     * Save a currentItem.
     *
     * @param currentItemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CurrentItemDTO save(CurrentItemDTO currentItemDTO) {
        log.debug("Request to save CurrentItem : {}", currentItemDTO);
        CurrentItem currentItem = currentItemMapper.toEntity(currentItemDTO);
        currentItem = currentItemRepository.save(currentItem);
        CurrentItemDTO result = currentItemMapper.toDto(currentItem);
        currentItemSearchRepository.save(currentItem);
        return result;
    }

    /**
     * Get all the currentItems.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CurrentItemDTO> findAll() {
        log.debug("Request to get all CurrentItems");
        return currentItemRepository.findAll().stream()
            .map(currentItemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one currentItem by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CurrentItemDTO findOne(Long id) {
        log.debug("Request to get CurrentItem : {}", id);
        CurrentItem currentItem = currentItemRepository.findOne(id);
        return currentItemMapper.toDto(currentItem);
    }

    /**
     * Delete the currentItem by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CurrentItem : {}", id);
        currentItemRepository.delete(id);
        currentItemSearchRepository.delete(id);
    }

    /**
     * Search for the currentItem corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CurrentItemDTO> search(String query) {
        log.debug("Request to search CurrentItems for query {}", query);
        return StreamSupport
            .stream(currentItemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(currentItemMapper::toDto)
            .collect(Collectors.toList());
    }
}
