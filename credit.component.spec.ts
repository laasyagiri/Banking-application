import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditComponent } from './credit.component';
import { BankingserviceService } from '../bankingservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
 
describe('CreditComponent', () => {
  let component: CreditComponent;
  let fixture: ComponentFixture<CreditComponent>;
  let bankingService: BankingserviceService;
  let router: Router;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, CreditComponent],
      providers: [BankingserviceService]
    }).compileComponents();
 
    fixture = TestBed.createComponent(CreditComponent);
    component = fixture.componentInstance;
    bankingService = TestBed.inject(BankingserviceService);
    router = TestBed.inject(Router);
 
    fixture.detectChanges();
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should initialize creditData with empty fields', () => {
    expect(component.creditData.accountNumber).toBe('');
    expect(component.creditData.accountHolderName).toBe('');
    expect(component.creditData.amount).toBeNull();
  });
 
  it('should call creditAmount and recordTransaction on valid submit', () => {
    const accno = 2421010;
    const amount = 500;
    component.creditData.accountNumber = accno.toString();
    component.creditData.amount = amount;
    component.creditData.accountHolderName = 'Nimmi';
 
    spyOn(bankingService, 'creditAmount').and.returnValue(of({}));
    spyOn(bankingService, 'getUserByAccNo').and.returnValue(
      of([{ id: 1, accno, username: 'Nimmi', balance: 1000 }])
    );
    spyOn(bankingService, 'recordTransaction').and.returnValue(of({}));
    // spyOn(router, 'navigate');
    const navigateSpy = spyOn(router, 'navigate');
 
    component.onSubmit();
 
    fixture.whenStable().then(() => {
      expect(bankingService.creditAmount).toHaveBeenCalledWith(accno, amount);
      expect(bankingService.recordTransaction).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/home']);
    });
  });
});