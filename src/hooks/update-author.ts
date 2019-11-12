// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, id, data } = context;
    const product = await app
          .service("products")
          .get(id);
    if (data.authorId !== product.authorId) {
      app.service('products').publish('updated', () => {
        console.log('Author changed');
        return app.channel(`authors/${product.authorId}`);
      });
    }
    return context;
  };
}
