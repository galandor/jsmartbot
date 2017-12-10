package ru.galandor.jsmartbot.service;

import ru.galandor.jsmartbot.service.dto.CurrentItemDTO;
import java.util.List;

/**
 * Service Interface for managing CurrentItem.
 */
public interface CurrentItemService {

    /**
     * Save a currentItem.
     *
     * @param currentItemDTO the entity to save
     * @return the persisted entity
     */
    CurrentItemDTO save(CurrentItemDTO currentItemDTO);

    /**
     * Get all the currentItems.
     *
     * @return the list of entities
     */
    List<CurrentItemDTO> findAll();

    /**
     * Get the "id" currentItem.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CurrentItemDTO findOne(Long id);

    /**
     * Delete the "id" currentItem.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the currentItem corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<CurrentItemDTO> search(String query);
}
