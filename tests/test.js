import {Selector} from 'testcafe';

fixture `Use build-in assertions`
  .page `https://psi.cx`;

/*class Page {
  constructor() {
    this.nameInput = Selector('#developer-name');
    this.checkboxes = Selector('input[type="checkbox"]');
    this.radioButtons = Selector('input[type="radio"]');
    this.triedTestCafeCheckbox = this.checkboxes.filter('#tried-test-cafe');
    this.commentsTextArea = Selector('#comments');
    this.interfaceSelect = Selector('#preferred-interface');
    this.submitButton = Selector('#submit-button');

    this.slider = {
      handle: Selector('.ui-slider-handle'),
      tick: Selector('.slider-value')
    };
  }
}

const page = new Page();*/

test('test 1', async t => {
  await t
    .expect(Selector('header').exists).ok
    // .takeScreenshot()
});

/*

test('test 2', async t => {
  await t
    .expect(page.checkboxes.count).gte(6, 'there are at least six checkboxes on the page')
    .expect(page.radioButtons.count).lte(3, 'there are at most three radio buttons on the page')
});

test('test 3', async t => {
  await t
    .expect(page.triedTestCafeCheckbox.checked).notOk()
    .click(page.triedTestCafeCheckbox)
    .expect(page.triedTestCafeCheckbox.checked).ok()
});

test('test 4', async t => {
  await t
    .expect(page.commentsTextArea.value).eql('')
    .typeText(page.commentsTextArea, 'Super!')
    .expect(page.commentsTextArea.value).notEql('Super', 'comments textarea value is not "Super", it is "Super!"')
});

test('test 5', async t => {
  await t
    .expect(page.interfaceSelect.childElementCount).within(0, 3, 'interface select three options, and this number is within a range between 0 and 2')
    .expect(page.interfaceSelect.find('options').count).notWithin(4, 6, 'interface select three options, and this number is not within a range between 4 and 6')
});
*/
