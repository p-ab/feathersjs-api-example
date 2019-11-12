import * as authentication from '@feathersjs/authentication';
import processProduct from '../../hooks/process-product';
import populateAuthor from '../../hooks/populate-author';
import updateAuthor from '../../hooks/update-author';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processProduct()],
    update: [updateAuthor()],
    patch: [updateAuthor()],
    remove: []
  },

  after: {
    all: [populateAuthor()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
