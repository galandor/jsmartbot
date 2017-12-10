package ru.galandor.jsmartbot.web.rest;

import ru.galandor.jsmartbot.JsmartbotApp;

import ru.galandor.jsmartbot.domain.CurrentItem;
import ru.galandor.jsmartbot.repository.CurrentItemRepository;
import ru.galandor.jsmartbot.service.CurrentItemService;
import ru.galandor.jsmartbot.repository.search.CurrentItemSearchRepository;
import ru.galandor.jsmartbot.service.dto.CurrentItemDTO;
import ru.galandor.jsmartbot.service.mapper.CurrentItemMapper;
import ru.galandor.jsmartbot.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static ru.galandor.jsmartbot.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CurrentItemResource REST controller.
 *
 * @see CurrentItemResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JsmartbotApp.class)
public class CurrentItemResourceIntTest {

    private static final Integer DEFAULT_USER_ID = 1;
    private static final Integer UPDATED_USER_ID = 2;

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private CurrentItemRepository currentItemRepository;

    @Autowired
    private CurrentItemMapper currentItemMapper;

    @Autowired
    private CurrentItemService currentItemService;

    @Autowired
    private CurrentItemSearchRepository currentItemSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCurrentItemMockMvc;

    private CurrentItem currentItem;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CurrentItemResource currentItemResource = new CurrentItemResource(currentItemService);
        this.restCurrentItemMockMvc = MockMvcBuilders.standaloneSetup(currentItemResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CurrentItem createEntity(EntityManager em) {
        CurrentItem currentItem = new CurrentItem()
            .userId(DEFAULT_USER_ID)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return currentItem;
    }

    @Before
    public void initTest() {
        currentItemSearchRepository.deleteAll();
        currentItem = createEntity(em);
    }

    @Test
    @Transactional
    public void createCurrentItem() throws Exception {
        int databaseSizeBeforeCreate = currentItemRepository.findAll().size();

        // Create the CurrentItem
        CurrentItemDTO currentItemDTO = currentItemMapper.toDto(currentItem);
        restCurrentItemMockMvc.perform(post("/api/current-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CurrentItem in the database
        List<CurrentItem> currentItemList = currentItemRepository.findAll();
        assertThat(currentItemList).hasSize(databaseSizeBeforeCreate + 1);
        CurrentItem testCurrentItem = currentItemList.get(currentItemList.size() - 1);
        assertThat(testCurrentItem.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testCurrentItem.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testCurrentItem.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);

        // Validate the CurrentItem in Elasticsearch
        CurrentItem currentItemEs = currentItemSearchRepository.findOne(testCurrentItem.getId());
        assertThat(currentItemEs).isEqualToIgnoringGivenFields(testCurrentItem);
    }

    @Test
    @Transactional
    public void createCurrentItemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = currentItemRepository.findAll().size();

        // Create the CurrentItem with an existing ID
        currentItem.setId(1L);
        CurrentItemDTO currentItemDTO = currentItemMapper.toDto(currentItem);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCurrentItemMockMvc.perform(post("/api/current-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentItemDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CurrentItem in the database
        List<CurrentItem> currentItemList = currentItemRepository.findAll();
        assertThat(currentItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCurrentItems() throws Exception {
        // Initialize the database
        currentItemRepository.saveAndFlush(currentItem);

        // Get all the currentItemList
        restCurrentItemMockMvc.perform(get("/api/current-items?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(currentItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void getCurrentItem() throws Exception {
        // Initialize the database
        currentItemRepository.saveAndFlush(currentItem);

        // Get the currentItem
        restCurrentItemMockMvc.perform(get("/api/current-items/{id}", currentItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(currentItem.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCurrentItem() throws Exception {
        // Get the currentItem
        restCurrentItemMockMvc.perform(get("/api/current-items/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCurrentItem() throws Exception {
        // Initialize the database
        currentItemRepository.saveAndFlush(currentItem);
        currentItemSearchRepository.save(currentItem);
        int databaseSizeBeforeUpdate = currentItemRepository.findAll().size();

        // Update the currentItem
        CurrentItem updatedCurrentItem = currentItemRepository.findOne(currentItem.getId());
        // Disconnect from session so that the updates on updatedCurrentItem are not directly saved in db
        em.detach(updatedCurrentItem);
        updatedCurrentItem
            .userId(UPDATED_USER_ID)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        CurrentItemDTO currentItemDTO = currentItemMapper.toDto(updatedCurrentItem);

        restCurrentItemMockMvc.perform(put("/api/current-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentItemDTO)))
            .andExpect(status().isOk());

        // Validate the CurrentItem in the database
        List<CurrentItem> currentItemList = currentItemRepository.findAll();
        assertThat(currentItemList).hasSize(databaseSizeBeforeUpdate);
        CurrentItem testCurrentItem = currentItemList.get(currentItemList.size() - 1);
        assertThat(testCurrentItem.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testCurrentItem.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testCurrentItem.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);

        // Validate the CurrentItem in Elasticsearch
        CurrentItem currentItemEs = currentItemSearchRepository.findOne(testCurrentItem.getId());
        assertThat(currentItemEs).isEqualToIgnoringGivenFields(testCurrentItem);
    }

    @Test
    @Transactional
    public void updateNonExistingCurrentItem() throws Exception {
        int databaseSizeBeforeUpdate = currentItemRepository.findAll().size();

        // Create the CurrentItem
        CurrentItemDTO currentItemDTO = currentItemMapper.toDto(currentItem);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCurrentItemMockMvc.perform(put("/api/current-items")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(currentItemDTO)))
            .andExpect(status().isCreated());

        // Validate the CurrentItem in the database
        List<CurrentItem> currentItemList = currentItemRepository.findAll();
        assertThat(currentItemList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCurrentItem() throws Exception {
        // Initialize the database
        currentItemRepository.saveAndFlush(currentItem);
        currentItemSearchRepository.save(currentItem);
        int databaseSizeBeforeDelete = currentItemRepository.findAll().size();

        // Get the currentItem
        restCurrentItemMockMvc.perform(delete("/api/current-items/{id}", currentItem.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean currentItemExistsInEs = currentItemSearchRepository.exists(currentItem.getId());
        assertThat(currentItemExistsInEs).isFalse();

        // Validate the database is empty
        List<CurrentItem> currentItemList = currentItemRepository.findAll();
        assertThat(currentItemList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCurrentItem() throws Exception {
        // Initialize the database
        currentItemRepository.saveAndFlush(currentItem);
        currentItemSearchRepository.save(currentItem);

        // Search the currentItem
        restCurrentItemMockMvc.perform(get("/api/_search/current-items?query=id:" + currentItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(currentItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID)))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CurrentItem.class);
        CurrentItem currentItem1 = new CurrentItem();
        currentItem1.setId(1L);
        CurrentItem currentItem2 = new CurrentItem();
        currentItem2.setId(currentItem1.getId());
        assertThat(currentItem1).isEqualTo(currentItem2);
        currentItem2.setId(2L);
        assertThat(currentItem1).isNotEqualTo(currentItem2);
        currentItem1.setId(null);
        assertThat(currentItem1).isNotEqualTo(currentItem2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CurrentItemDTO.class);
        CurrentItemDTO currentItemDTO1 = new CurrentItemDTO();
        currentItemDTO1.setId(1L);
        CurrentItemDTO currentItemDTO2 = new CurrentItemDTO();
        assertThat(currentItemDTO1).isNotEqualTo(currentItemDTO2);
        currentItemDTO2.setId(currentItemDTO1.getId());
        assertThat(currentItemDTO1).isEqualTo(currentItemDTO2);
        currentItemDTO2.setId(2L);
        assertThat(currentItemDTO1).isNotEqualTo(currentItemDTO2);
        currentItemDTO1.setId(null);
        assertThat(currentItemDTO1).isNotEqualTo(currentItemDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(currentItemMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(currentItemMapper.fromId(null)).isNull();
    }
}
