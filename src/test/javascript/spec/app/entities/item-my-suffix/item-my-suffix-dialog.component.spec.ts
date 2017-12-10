/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JsmartbotTestModule } from '../../../test.module';
import { ItemMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix-dialog.component';
import { ItemMySuffixService } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix.service';
import { ItemMySuffix } from '../../../../../../main/webapp/app/entities/item-my-suffix/item-my-suffix.model';

describe('Component Tests', () => {

    describe('ItemMySuffix Management Dialog Component', () => {
        let comp: ItemMySuffixDialogComponent;
        let fixture: ComponentFixture<ItemMySuffixDialogComponent>;
        let service: ItemMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JsmartbotTestModule],
                declarations: [ItemMySuffixDialogComponent],
                providers: [
                    ItemMySuffixService
                ]
            })
            .overrideTemplate(ItemMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ItemMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ItemMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ItemMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.item = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'itemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ItemMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.item = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'itemListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
