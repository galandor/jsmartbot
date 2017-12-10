package ru.galandor.jsmartbot.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CurrentItem entity.
 */
public class CurrentItemDTO implements Serializable {

    private Long id;

    private Integer userId;

    private Instant createdAt;

    private Instant updatedAt;

    private Long itemIdId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getItemIdId() {
        return itemIdId;
    }

    public void setItemIdId(Long itemId) {
        this.itemIdId = itemId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CurrentItemDTO currentItemDTO = (CurrentItemDTO) o;
        if(currentItemDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), currentItemDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CurrentItemDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
