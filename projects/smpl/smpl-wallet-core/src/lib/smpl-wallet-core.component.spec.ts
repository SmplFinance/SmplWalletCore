import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmplWalletCoreComponent } from './smpl-wallet-core.component';

describe('SmplWalletCoreComponent', () => {
  let component: SmplWalletCoreComponent;
  let fixture: ComponentFixture<SmplWalletCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmplWalletCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmplWalletCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
