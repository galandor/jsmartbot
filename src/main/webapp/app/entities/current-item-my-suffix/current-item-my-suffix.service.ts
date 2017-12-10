import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CurrentItemMySuffix } from './current-item-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CurrentItemMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/current-items';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/current-items';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(currentItem: CurrentItemMySuffix): Observable<CurrentItemMySuffix> {
        const copy = this.convert(currentItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(currentItem: CurrentItemMySuffix): Observable<CurrentItemMySuffix> {
        const copy = this.convert(currentItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CurrentItemMySuffix> {
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
     * Convert a returned JSON object to CurrentItemMySuffix.
     */
    private convertItemFromServer(json: any): CurrentItemMySuffix {
        const entity: CurrentItemMySuffix = Object.assign(new CurrentItemMySuffix(), json);
        entity.createdAt = this.dateUtils
            .convertDateTimeFromServer(json.createdAt);
        entity.updatedAt = this.dateUtils
            .convertDateTimeFromServer(json.updatedAt);
        return entity;
    }

    /**
     * Convert a CurrentItemMySuffix to a JSON which can be sent to the server.
     */
    private convert(currentItem: CurrentItemMySuffix): CurrentItemMySuffix {
        const copy: CurrentItemMySuffix = Object.assign({}, currentItem);

        copy.createdAt = this.dateUtils.toDate(currentItem.createdAt);

        copy.updatedAt = this.dateUtils.toDate(currentItem.updatedAt);
        return copy;
    }
}
