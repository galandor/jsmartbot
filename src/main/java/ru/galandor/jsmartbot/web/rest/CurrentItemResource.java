package ru.galandor.jsmartbot.web.rest;

import com.codahale.metrics.annotation.Timed;
import ru.galandor.jsmartbot.service.CurrentItemService;
import ru.galandor.jsmartbot.web.rest.errors.BadRequestAlertException;
import ru.galandor.jsmartbot.web.rest.util.HeaderUtil;
import ru.galandor.jsmartbot.service.dto.CurrentItemDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing CurrentItem.
 */
@RestController
@RequestMapping("/api")
public class CurrentItemResource {

    private final Logger log = LoggerFactory.getLogger(CurrentItemResource.class);

    private static final String ENTITY_NAME = "currentItem";

    private final CurrentItemService currentItemService;

    public CurrentItemResource(CurrentItemService currentItemService) {
        this.currentItemService = currentItemService;
    }

    /**
     * POST  /current-items : Create a new currentItem.
     *
     * @param currentItemDTO the currentItemDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new currentItemDTO, or with status 400 (Bad Request) if the currentItem has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/current-items")
    @Timed
    public ResponseEntity<CurrentItemDTO> createCurrentItem(@RequestBody CurrentItemDTO currentItemDTO) throws URISyntaxException {
        log.debug("REST request to save CurrentItem : {}", currentItemDTO);
        if (currentItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new currentItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CurrentItemDTO result = currentItemService.save(currentItemDTO);
        return ResponseEntity.created(new URI("/api/current-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /current-items : Updates an existing currentItem.
     *
     * @param currentItemDTO the currentItemDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated currentItemDTO,
     * or with status 400 (Bad Request) if the currentItemDTO is not valid,
     * or with status 500 (Internal Server Error) if the currentItemDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/current-items")
    @Timed
    public ResponseEntity<CurrentItemDTO> updateCurrentItem(@RequestBody CurrentItemDTO currentItemDTO) throws URISyntaxException {
        log.debug("REST request to update CurrentItem : {}", currentItemDTO);
        if (currentItemDTO.getId() == null) {
            return createCurrentItem(currentItemDTO);
        }
        CurrentItemDTO result = currentItemService.save(currentItemDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, currentItemDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /current-items : get all the currentItems.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of currentItems in body
     */
    @GetMapping("/current-items")
    @Timed
    public List<CurrentItemDTO> getAllCurrentItems() {
        log.debug("REST request to get all CurrentItems");
        return currentItemService.findAll();
        }

    /**
     * GET  /current-items/:id : get the "id" currentItem.
     *
     * @param id the id of the currentItemDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the currentItemDTO, or with status 404 (Not Found)
     */
    @GetMapping("/current-items/{id}")
    @Timed
    public ResponseEntity<CurrentItemDTO> getCurrentItem(@PathVariable Long id) {
        log.debug("REST request to get CurrentItem : {}", id);
        CurrentItemDTO currentItemDTO = currentItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(currentItemDTO));
    }

    /**
     * DELETE  /current-items/:id : delete the "id" currentItem.
     *
     * @param id the id of the currentItemDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/current-items/{id}")
    @Timed
    public ResponseEntity<Void> deleteCurrentItem(@PathVariable Long id) {
        log.debug("REST request to delete CurrentItem : {}", id);
        currentItemService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/current-items?query=:query : search for the currentItem corresponding
     * to the query.
     *
     * @param query the query of the currentItem search
     * @return the result of the search
     */
    @GetMapping("/_search/current-items")
    @Timed
    public List<CurrentItemDTO> searchCurrentItems(@RequestParam String query) {
        log.debug("REST request to search CurrentItems for query {}", query);
        return currentItemService.search(query);
    }

}
