import { BaseEntity } from './../../shared';

export const enum Type {
    'QUESTION',
    'ANSWER',
    'MESSAGE',
    'INPUT'
}

export class ItemMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: Type,
        public text?: string,
        public createdAt?: any,
        public updatedAt?: any,
        public first?: boolean,
        public nextItemId?: number,
        public parentItemId?: number,
    ) {
        this.first = false;
    }
}
