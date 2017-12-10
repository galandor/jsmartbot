/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JsmartbotTestModule } from '../../../test.module';
import { CurrentItemMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/current-item-my-suffix/current-item-my-suffix-delete-dialog.component';
import { CurrentItemMySuffixService } from '../../../../../../main/webapp/app/entities/current-item-my-suffix/current-item-my-suffix.service';

describe('Component Tests', () => {

    describe('CurrentItemMySuffix Management Delete Component', () => {
        let comp: CurrentItemMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CurrentItemMySuffixDeleteDialogComponent>;
        let service: CurrentItemMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JsmartbotTestModule],
                declarations: [CurrentItemMySuffixDeleteDialogComponent],
                providers: [
                    CurrentItemMySuffixService
                ]
            })
            .overrideTemplate(CurrentItemMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrentItemMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrentItemMySuffixService);
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
