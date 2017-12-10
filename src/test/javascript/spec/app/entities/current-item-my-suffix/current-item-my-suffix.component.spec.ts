/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JsmartbotTestModule } from '../../../test.module';
import { CurrentItemMySuffixComponent } from '../../../../../../main/webapp/app/entities/current-item-my-suffix/current-item-my-suffix.component';
import { CurrentItemMySuffixService } from '../../../../../../main/webapp/app/entities/current-item-my-suffix/current-item-my-suffix.service';
import { CurrentItemMySuffix } from '../../../../../../main/webapp/app/entities/current-item-my-suffix/current-item-my-suffix.model';

describe('Component Tests', () => {

    describe('CurrentItemMySuffix Management Component', () => {
        let comp: CurrentItemMySuffixComponent;
        let fixture: ComponentFixture<CurrentItemMySuffixComponent>;
        let service: CurrentItemMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JsmartbotTestModule],
                declarations: [CurrentItemMySuffixComponent],
                providers: [
                    CurrentItemMySuffixService
                ]
            })
            .overrideTemplate(CurrentItemMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrentItemMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrentItemMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CurrentItemMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.currentItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
