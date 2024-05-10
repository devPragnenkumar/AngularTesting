import {
  fireEvent,
  getAllByRole,
  render,
  screen,
} from '@testing-library/angular';
import { AppDupComponent } from './AppDups.component';
import userEvent from '@testing-library/user-event';

const formDummyValues = {
  userName: 'John doe',
};
// Test Description for testing using Angular Testing Library

// To test rendering of appComponent

const appDupComponentSetUp = () => {
  it('should create the app', async () => {
    const { getByTestId } = await render(AppDupComponent);
    expect(getByTestId('title')).toBeInTheDocument;
  });

  it(`should have the 'AngularTesting' title`, async () => {
    const { getByTestId } = await render(AppDupComponent);
    expect(getByTestId('title').textContent).toBe('AngularTesting');
  });

  it('should render form', async () => {
    const { getByTestId } = await render(AppDupComponent);
    expect(getByTestId('form'));
  });
};

// To test userName Field
const userNameFieldTesting = () => {
  beforeEach(async () => {});

  it('Test UserName Input and Binding', async () => {
    const { getByTestId, debug, getByDisplayValue, getByText } = await render(
      AppDupComponent
    );
    const user = userEvent.setup();
    const userNameField = getByTestId('userName');
    await user.type(userNameField, formDummyValues.userName);

    expect(screen.getByDisplayValue(formDummyValues.userName))
      .toBeInTheDocument;
  });
};

// To test gender Field
const genderFieldTesting = () => {
  let genderField: HTMLElement;
  let genderOptions: NodeListOf<HTMLOptionElement>;
  it('Test UserName Input and Binding', async () => {
    const { getByTestId } = await render(AppDupComponent);

    const genderField = getByTestId('gender');
    const genderOptions = Array.from(getAllByRole(genderField, 'option'));
    await userEvent.click(genderField);
    await userEvent.selectOptions(genderField, genderOptions[0] ?? 'male');

    expect(
      screen.getByDisplayValue(genderOptions[0].textContent ?? 'male')
    ).toBe(genderField);
  });
};

const formTesting = () => {
  it('Submit Empty Form', async () => {
    const { getByTestId } = await render(AppDupComponent);
    const submitButton = getByTestId('submitButton');
    const form = getByTestId('form');
    const handleClick = jest.fn((e: Event) => {
      e.preventDefault();
    });
    form.addEventListener('submit', handleClick);
    await userEvent.click(submitButton);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('Fill Form and Submit it', async () => {
    const { getByTestId } = await render(AppDupComponent);
    const submitButton = getByTestId('submitButton');
    const userNameField = getByTestId('userName');
    const genderField = getByTestId('gender');
    const form = getByTestId('form');
    const genderOptions = Array.from(getAllByRole(genderField, 'option'));

    const handleClick = jest.fn((e: Event) => {
      e.preventDefault();
    });
    form.addEventListener('submit', handleClick);
    await userEvent.type(userNameField, formDummyValues.userName);
    await userEvent.selectOptions(genderField, genderOptions[0] ?? 'male');
    await userEvent.click(submitButton);
    expect(handleClick).toHaveBeenCalled();
  });
};
describe('AppDupComponent', () => {
  // Testing Using Angular Testing Library
  describe('AppComponent SetUp', appDupComponentSetUp);
  describe('Testing UserName Field', userNameFieldTesting);
  describe('Testing Gender Field', genderFieldTesting);
  describe('Testing Form', formTesting);
});
