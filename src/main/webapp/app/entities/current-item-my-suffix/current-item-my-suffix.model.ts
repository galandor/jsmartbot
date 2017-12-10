import { BaseEntity } from './../../shared';

export class CurrentItemMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public createdAt?: any,
        public updatedAt?: any,
        public itemIdId?: number,
    ) {
    }
}
