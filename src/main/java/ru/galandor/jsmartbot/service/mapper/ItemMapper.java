package ru.galandor.jsmartbot.service.mapper;

import ru.galandor.jsmartbot.domain.*;
import ru.galandor.jsmartbot.service.dto.ItemDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Item and its DTO ItemDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ItemMapper extends EntityMapper<ItemDTO, Item> {

    @Mapping(source = "nextItem.id", target = "nextItemId")
    @Mapping(source = "parentItem.id", target = "parentItemId")
    ItemDTO toDto(Item item); 

    @Mapping(source = "nextItemId", target = "nextItem")
    @Mapping(source = "parentItemId", target = "parentItem")
    Item toEntity(ItemDTO itemDTO);

    default Item fromId(Long id) {
        if (id == null) {
            return null;
        }
        Item item = new Item();
        item.setId(id);
        return item;
    }
}
