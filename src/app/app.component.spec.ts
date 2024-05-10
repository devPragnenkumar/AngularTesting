import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

const formDummyValues = {
  userName: 'John doe',
};

// Test Description for testing using Angular Native Support

// To test rendering of appComponent
const appComponentSetUp = () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app);
  });

  it(`should have the 'AngularTesting' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('AngularTesting');
  });

  it('should render form', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const form = fixture.nativeElement.querySelector('form');
    expect(form);
  });
};

// To test userName Field
const userNameFieldTesting = () => {
  let fixture: ComponentFixture<AppComponent>;
  let componentInstance: AppComponent;
  let debugElement: DebugElement;
  let nativeElement: any;
  let userNameField: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;
    userNameField = nativeElement.querySelector('#userName');

    fixture.autoDetectChanges();
  });

  it('Test UserName Input and Binding', async () => {
    userNameField.value = formDummyValues.userName;
    userNameField.dispatchEvent(new Event('input'));
    expect(userNameField.value).toBe(formDummyValues.userName);
    expect(componentInstance.formGroup.controls['userName'].value).toBe(
      formDummyValues.userName
    );
  });
};

// To test gender dropdown list
const genderFieldTesting = () => {
  let fixture: ComponentFixture<AppComponent>;
  let componentInstance: AppComponent;
  let debugElement: DebugElement;
  let nativeElement: any;
  let genderField: HTMLSelectElement;
  let genderOptions: NodeListOf<HTMLOptionElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;
    genderField = nativeElement.querySelector('#gender');
    genderOptions = genderField?.querySelectorAll('option');
    fixture.autoDetectChanges();
  });

  it('Test UserName Input and Binding', async () => {
    genderField.click();
    let firstOption;
    if (genderOptions.length > 0) firstOption = genderOptions[0];
    genderField.selectedIndex = 0;
    genderField.dispatchEvent(new Event('change'));
    expect(componentInstance.formGroup.controls['gender'].value).toBe(
      firstOption?.value
    );
  });
};

// to test form
const formTesting = () => {
  let fixture: ComponentFixture<AppComponent>;
  let componentInstance: AppComponent;
  let debugElement: DebugElement;
  let nativeElement: any;
  let userNameField: HTMLInputElement;
  let genderField: HTMLSelectElement;
  let genderOptions: NodeListOf<HTMLOptionElement>;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = fixture.nativeElement;
    userNameField = nativeElement.querySelector('#userName');
    genderField = nativeElement.querySelector('#gender');
    genderOptions = genderField?.querySelectorAll('option');
    submitButton = nativeElement.querySelector('#submitButton');

    fixture.autoDetectChanges();
  });

  it('Submit Empty Form', () => {
    jest.spyOn(componentInstance, 'onSubmit');
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    expect(submitButton.disabled).toBeTruthy();
  });
  it('Fill the form and Submit', () => {
    userNameField.value = formDummyValues.userName;
    userNameField.dispatchEvent(new Event('input'));
    genderField.click();
    genderField.selectedIndex = 0;
    genderField.dispatchEvent(new Event('change'));
    jest.spyOn(componentInstance, 'onSubmit');
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);

    expect(componentInstance.onSubmit).toHaveBeenCalledTimes(1);
  });
};

// Test Description for testing using Angular testing library
describe('AppComponent', () => {
  // Testing Using Angular Native Support
  describe('AppComponent SetUp', appComponentSetUp);
  describe('Testing UserName Field', userNameFieldTesting);
  describe('Testing Gender Field', genderFieldTesting);
  describe('Testing Form', formTesting);
});
