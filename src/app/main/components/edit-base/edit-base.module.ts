import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditBaseComponent} from '@components/edit-base/edit-base.component';


@NgModule({
    declarations: [EditBaseComponent],
    exports: [EditBaseComponent],
    imports: [CommonModule]
})
export class EditBaseModule {
}
