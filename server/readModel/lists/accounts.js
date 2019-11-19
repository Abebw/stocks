'use strict';

const fields = {
  ownerName: { initialState: 'account'},
  timestamp: { initialState: 0, fastLookup: true }
};

const projections = {
  'accounts.account.open' (accounts, event) {
    accounts.add({ownerName: event.data.ownerName,
      timestamp: event.metadata.timestamp});
  }
};

module.exports = { fields, projections };
