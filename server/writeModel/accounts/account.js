'use strict';

const initialState = {
  positions: {cash:0},
  sellOffers: {},
  ownerName:null,
  isAuthorized: {
    commands: {
      open: { forPublic: true },
      offerToSell: { forPublic: true },
      buy: { forPublic: true },
      deposit: { forPublic: true },
      administrate: { forPublic: true }
    },
    events: {
      opened: { forPublic: true },
      offeredForSale: { forPublic: true },
      bought: { forPublic: true },
      deposited: { forPublic: true },
      administrated: { forPublic: true },
      saleClosed: { forPublic: true}
    }
  }
};

const commands = {
  async open (account, command) {
    if (!command.data.ownerName) {
      return command.reject('please provide owners name when opening account');
    }
    account.events.publish('opened', {ownerName: command.data.ownerName});
  },
  async offerToSell (account, command) {
    return command.reject('Not implemented yet');
    //sampleAggregate.events.publish('offerToSell', { });
  },
  async buy (account, command) {
    return command.reject('Not implemented yet');
    //sampleAggregate.events.publish('offerToSell', { });
  },
  async deposit (account, command) {
    return command.reject('Not implemented yet');
    //sampleAggregate.events.publish('offerToSell', { });
  },
  async administrate (account, command) {
    //return command.reject('Not implemented yet');
    account.events.publish('administrated', command.data);
  }
};

const events = {
  opened (account, event) {
    account.setState({ownerName: event.data.ownerName});
  },
  offeredForSale (account, event) {
    account.setState({
      // ...
    });
  },
  bought (account, event) {
    account.setState({
      // ...
    });
  },
  deposited (account, event) {
    account.setState({
      // ...
    });
  },
  saleClosed (account, event) {
    account.setState({
      // ...
    });
  },
  administrated (account, event) {
    account.setState({
      positions: event.data.positions
    });
  },

};

module.exports = { initialState, commands, events };
