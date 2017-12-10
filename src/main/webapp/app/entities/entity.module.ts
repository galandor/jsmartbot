import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JsmartbotItemMySuffixModule } from './item-my-suffix/item-my-suffix.module';
import { JsmartbotCurrentItemMySuffixModule } from './current-item-my-suffix/current-item-my-suffix.module';
import { JsmartbotRegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { JsmartbotCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { JsmartbotLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { JsmartbotDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { JsmartbotTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { JsmartbotEmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { JsmartbotJobMySuffixModule } from './job-my-suffix/job-my-suffix.module';
import { JsmartbotJobHistoryMySuffixModule } from './job-history-my-suffix/job-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JsmartbotItemMySuffixModule,
        JsmartbotCurrentItemMySuffixModule,
        JsmartbotRegionMySuffixModule,
        JsmartbotCountryMySuffixModule,
        JsmartbotLocationMySuffixModule,
        JsmartbotDepartmentMySuffixModule,
        JsmartbotTaskMySuffixModule,
        JsmartbotEmployeeMySuffixModule,
        JsmartbotJobMySuffixModule,
        JsmartbotJobHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JsmartbotEntityModule {}
