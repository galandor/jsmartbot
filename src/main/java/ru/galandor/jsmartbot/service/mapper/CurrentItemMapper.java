package ru.galandor.jsmartbot.service.mapper;

import ru.galandor.jsmartbot.domain.*;
import ru.galandor.jsmartbot.service.dto.CurrentItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CurrentItem and its DTO CurrentItemDTO.
 */
@Mapper(componentModel = "spring", uses = {ItemMapper.class})
public interface CurrentItemMapper extends EntityMapper<CurrentItemDTO, CurrentItem> {

    @Mapping(source = "itemId.id", target = "itemIdId")
    CurrentItemDTO toDto(CurrentItem currentItem); 

    @Mapping(source = "itemIdId", target = "itemId")
    CurrentItem toEntity(CurrentItemDTO currentItemDTO);

    default CurrentItem fromId(Long id) {
        if (id == null) {
            return null;
        }
        CurrentItem currentItem = new CurrentItem();
        currentItem.setId(id);
        return currentItem;
    }
}
