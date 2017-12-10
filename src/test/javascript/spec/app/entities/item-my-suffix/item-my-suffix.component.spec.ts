/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JsmartbotTestModule } from '../../../test.module';
import { ItemMySuffixComponent } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix.component';
import { ItemMySuffixService } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix.service';
import { ItemMySuffix } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix.model';

describe('Component Tests', () => {

    describe('ItemMySuffix Management Component', () => {
        let comp: ItemMySuffixComponent;
        let fixture: ComponentFixture<ItemMySuffixComponent>;
        let service: ItemMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JsmartbotTestModule],
                declarations: [ItemMySuffixComponent],
                providers: [
                    ItemMySuffixService
                ]
            })
            .overrideTemplate(ItemMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new ItemMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.items[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
