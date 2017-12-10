/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JsmartbotTestModule } from '../../../test.module';
import { ItemMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix-detail.component';
import { ItemMySuffixService } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix.service';
import { ItemMySuffix } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix.model';

describe('Component Tests', () => {

    describe('ItemMySuffix Management Detail Component', () => {
        let comp: ItemMySuffixDetailComponent;
        let fixture: ComponentFixture<ItemMySuffixDetailComponent>;
        let service: ItemMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JsmartbotTestModule],
                declarations: [ItemMySuffixDetailComponent],
                providers: [
                    ItemMySuffixService
                ]
            })
            .overrideTemplate(ItemMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ItemMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.item).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
