/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JsmartbotTestModule } from '../../../test.module';
import { ItemMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix-delete-dialog.component';
import { ItemMySuffixService } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix.service';

describe('Component Tests', () => {

    describe('ItemMySuffix Management Delete Component', () => {
        let comp: ItemMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ItemMySuffixDeleteDialogComponent>;
        let service: ItemMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JsmartbotTestModule],
                declarations: [ItemMySuffixDeleteDialogComponent],
                providers: [
                    ItemMySuffixService
                ]
            })
            .overrideTemplate(ItemMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
