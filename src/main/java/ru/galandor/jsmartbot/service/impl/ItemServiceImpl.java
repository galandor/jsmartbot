package ru.galandor.jsmartbot.service.impl;

import ru.galandor.jsmartbot.service.ItemService;
import ru.galandor.jsmartbot.domain.Item;
import ru.galandor.jsmartbot.repository.ItemRepository;
import ru.galandor.jsmartbot.repository.search.ItemSearchRepository;
import ru.galandor.jsmartbot.service.dto.ItemDTO;
import ru.galandor.jsmartbot.service.mapper.ItemMapper;
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
 * Service Implementation for managing Item.
 */
@Service
@Transactional
public class ItemServiceImpl implements ItemService{

    private final Logger log = LoggerFactory.getLogger(ItemServiceImpl.class);

    private final ItemRepository itemRepository;

    private final ItemMapper itemMapper;

    private final ItemSearchRepository itemSearchRepository;

    public ItemServiceImpl(ItemRepository itemRepository, ItemMapper itemMapper, ItemSearchRepository itemSearchRepository) {
        this.itemRepository = itemRepository;
        this.itemMapper = itemMapper;
        this.itemSearchRepository = itemSearchRepository;
    }

    /**
     * Save a item.
     *
     * @param itemDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ItemDTO save(ItemDTO itemDTO) {
        log.debug("Request to save Item : {}", itemDTO);
        Item item = itemMapper.toEntity(itemDTO);
        item = itemRepository.save(item);
        ItemDTO result = itemMapper.toDto(item);
        itemSearchRepository.save(item);
        return result;
    }

    /**
     * Get all the items.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ItemDTO> findAll() {
        log.debug("Request to get all Items");
        return itemRepository.findAll().stream()
            .map(itemMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one item by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ItemDTO findOne(Long id) {
        log.debug("Request to get Item : {}", id);
        Item item = itemRepository.findOne(id);
        return itemMapper.toDto(item);
    }

    /**
     * Delete the item by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Item : {}", id);
        itemRepository.delete(id);
        itemSearchRepository.delete(id);
    }

    /**
     * Search for the item corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ItemDTO> search(String query) {
        log.debug("Request to search Items for query {}", query);
        return StreamSupport
            .stream(itemSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(itemMapper::toDto)
            .collect(Collectors.toList());
    }
}
