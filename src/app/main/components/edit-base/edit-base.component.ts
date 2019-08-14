import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '@root-store/state';
import {FormBuilder} from '@angular/forms';
import {RouterStoreSelectors} from '@root-store/router-store/index';
import {take} from 'rxjs/operators';
import {evalData} from '@core/utils/j-utils';
import {AlertController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-edit-base',
    templateUrl: './edit-base.component.html',
    styles: [],
})
export class EditBaseComponent<T> implements OnInit, OnDestroy {

    public confirmMessage = 'Are you sure that you want to perform this action?';
    protected state: PopUpData<T>;
    private subscription: Subscription;

    constructor(protected store$: Store<State>,
                protected ref: ChangeDetectorRef,
                protected alertController: AlertController,
                protected navCtrl: NavController,
                protected fb: FormBuilder,
    ) {
        ref.detach();
    }

    ngOnInit() {
        console.log('PopUpBaseComponent.ngOnInit()');
        this.subscription = this.store$.select(RouterStoreSelectors.selectExtra).pipe(
            take(1),
        ).subscribe(
            value => this.setState(evalData(() => value.state as PopUpData<T>, null))
        );
    }

    ngOnDestroy(): void {
        console.log('PopUpBaseComponent.ngOnDestroy()');
        this.subscription.unsubscribe();
    }

    setState(value: PopUpData<T>): void {
        console.log('PopUpBaseComponent.setItem()');
        if (value.props) {
            this.confirmMessage = value.props.confirmMessage || this.confirmMessage;
        }

        this.setItemPerform(value.item);
        this.ref.reattach();
        this.ref.markForCheck();
    }

    async onSave(value): Promise<void> {

        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: this.confirmMessage,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Ok',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.onSavePerform(value);
                    }
                }
            ]
        });

        await alert.present();

    }

    async onCopy(value): Promise<void> {
        console.log('EditBaseComponent.onCopy()');
        const cloned = {...{}, ...value, ...{id: undefined}};
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: this.confirmMessage,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Ok',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.onCopyPerform(cloned);
                    }
                }
            ]
        });

        await alert.present();

    }

    async onDelete(value): Promise<void> {
        console.log('EditBaseComponent.onCopy()');
        const cloned = {...{}, ...value, ...{id: undefined}};
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: this.confirmMessage,
            buttons: [
                {
                    text: 'Delete',
                    role: 'delete',
                    cssClass: 'secondary'
                }, {
                    text: 'Ok',
                    handler: () => {
                        console.log('Confirm Okay');
                        this.onDeletePerform(cloned);
                    }
                }
            ]
        });

        await alert.present();

    }

    onDeletePerform(value): void {
        throw new Error('Metodo da sovrascrivere');
    }

    onSavePerform(value): void {
        throw new Error('Metodo da sovrascrivere');
    }

    onCopyPerform(value): void {
        throw new Error('Metodo da sovrascrivere');
    }

    setItemPerform(value: T): void {
        throw new Error('Metodo da sovrascrivere');
    }


    cancel(): void {
        throw new Error('Metodo da sovrascrivere');
    }

    back(): void {
        this.navCtrl.back();
    }

}

export class PopUpData<T> {
    item: T;
    props: Partial<{ confirmMessage: string }>;
}
