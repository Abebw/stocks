'use strict';

const wolkenkit = require('wolkenkit-client');
let renderCount = 0;

const view = {
  accounts: document.querySelector('.accounts'),
  newAccount: document.querySelector('.new-Account'),
  renderAccounts: document.querySelector('.render-Accounts'),
  sendMessageForm: document.querySelector('.open-account-form'),

  render (accounts) {
    let html = accounts.map(account =>
      `<li class="account">
        <div class="label">owner ${account.ownerName}</div>
      </li>`
    ).join('');
    renderCount++;
    html = "<h2>Account renderCount: " +  renderCount + "</h2>" + html;

    console.log("abetest render returning accounts: " + accounts);
    view.accounts.innerHTML = html;
  }
};

const run = async function () {
  try {
    const stocks = await wolkenkit.connect({ host: 'localhost', port: 3000 });

    view.sendMessageForm.addEventListener('submit', event => {
      event.preventDefault();

      const ownerName = view.newAccount.value;
      console.log("opening account with ownerName: " + ownerName);
      window.view = view;
      window.stocks = stocks;
      stocks.accounts.account().open({ ownerName }).
        failed(err => console.error(err)).
        delivered(() => {
          view.newAccount.value = '';
          view.newAccount.focus();
        });
    });
    view.renderAccounts.addEventListener('click', event => {
      event.preventDefault();
      stocks.lists.accounts.read({
        orderBy: { timestamp: 'descending' },
        take: 50
      }).
        failed(err => console.error(err)).
        finished(view.render);
    });

    view.newAccount.focus();

    stocks.lists.accounts.readAndObserve({
      orderBy: { timestamp: 'descending' },
      take: 50
    }).
      failed(err => console.error(err)).
      started(view.render).
      updated(view.render);
  } catch (ex) {
    console.error(ex);
  }
};

run();
