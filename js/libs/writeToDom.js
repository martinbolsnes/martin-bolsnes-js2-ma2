import { saveToLocalStorage } from './localStorageHelper.js';

export default function writeToDOM(
  domElementIAmGoingToPutHTMLInto,
  theArrayIAmGoingToCreateHTMLFrom
) {
  domElementIAmGoingToPutHTMLInto.innerHTML = '';

  theArrayIAmGoingToCreateHTMLFrom.forEach(function (groceryItem, iteration) {
    let ischecked = '';
    if (groceryItem.checked) {
      ischecked = 'checked';
    }
    domElementIAmGoingToPutHTMLInto.innerHTML += `<li>
					<span>${groceryItem.name}</span>
					<input ${ischecked} type="checkbox" class="checkbox" data-id=${groceryItem.id}>
				</li>`;
  });

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(function (checkbox) {
    checkbox.onclick = function () {
      let indexOfItem = theArrayIAmGoingToCreateHTMLFrom.findIndex(function (
        groceryObject
      ) {
        return groceryObject.id === parseInt(checkbox.dataset.id);
      });
      const listBackground = document.querySelectorAll('li');
      if (theArrayIAmGoingToCreateHTMLFrom[indexOfItem].checked) {
        theArrayIAmGoingToCreateHTMLFrom[indexOfItem].checked = '';
        listBackground.forEach(function (item) {
          item.onclick = function () {
            item.style.backgroundColor = 'coral';
          };
        });
      } else {
        theArrayIAmGoingToCreateHTMLFrom[indexOfItem].checked = 'checked';
        listBackground.forEach(function (item) {
          item.onclick = function () {
            item.style.backgroundColor = '#00ff0d';
          };
        });
      }

      saveToLocalStorage('groceryArrayKey', theArrayIAmGoingToCreateHTMLFrom);
    };
  });
}
