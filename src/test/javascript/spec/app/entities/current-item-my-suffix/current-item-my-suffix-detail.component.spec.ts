/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JsmartbotTestModule } from '../../../test.module';
import { CurrentItemMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/current-item-my-suffix/current-item-my-suffix-detail.component';
import { CurrentItemMySuffixService } from '../../../../../../main/webapp/app/entities/current-item-my-suffix/current-item-my-suffix.service';
import { CurrentItemMySuffix } from '../../../../../../main/webapp/app/entities/current-item-my-suffix/current-item-my-suffix.model';

describe('Component Tests', () => {

    describe('CurrentItemMySuffix Management Detail Component', () => {
        let comp: CurrentItemMySuffixDetailComponent;
        let fixture: ComponentFixture<CurrentItemMySuffixDetailComponent>;
        let service: CurrentItemMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JsmartbotTestModule],
                declarations: [CurrentItemMySuffixDetailComponent],
                providers: [
                    CurrentItemMySuffixService
                ]
            })
            .overrideTemplate(CurrentItemMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrentItemMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrentItemMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new CurrentItemMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.currentItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
