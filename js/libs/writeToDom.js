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

      console.log(indexOfItem);
      console.log(theArrayIAmGoingToCreateHTMLFrom[indexOfItem]);

      if (theArrayIAmGoingToCreateHTMLFrom[indexOfItem].checked) {
        theArrayIAmGoingToCreateHTMLFrom[indexOfItem].checked = '';
        document.querySelector('li').classList.remove('checked');
      } else {
        theArrayIAmGoingToCreateHTMLFrom[indexOfItem].checked = 'checked';
        document.querySelector('li').classList.add('checked');
      }

      saveToLocalStorage('groceryArrayKey', theArrayIAmGoingToCreateHTMLFrom);
    };
  });
}
