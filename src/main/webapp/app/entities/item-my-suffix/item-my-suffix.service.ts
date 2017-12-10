import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ItemMySuffix } from './item-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ItemMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/items';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/items';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(item: ItemMySuffix): Observable<ItemMySuffix> {
        const copy = this.convert(item);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(item: ItemMySuffix): Observable<ItemMySuffix> {
        const copy = this.convert(item);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ItemMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to ItemMySuffix.
     */
    private convertItemFromServer(json: any): ItemMySuffix {
        const entity: ItemMySuffix = Object.assign(new ItemMySuffix(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a ItemMySuffix to a JSON which can be sent to the server.
     */
    private convert(item: ItemMySuffix): ItemMySuffix {
        const copy: ItemMySuffix = Object.assign({}, item);

        copy.createdAt = this.dateUtils.toDate(item.createdAt);

        copy.updatedAt = this.dateUtils.toDate(item.updatedAt);
        return copy;
    }
}
