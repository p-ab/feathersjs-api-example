// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

interface Product {
  title: string,
  price: number,
  quantity: number,
  colors?: String[],
  createdBy?: string,
  authorId?: string,
  author?: any
}

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { app, method, result, params } = context;
    const products = method === "find" ? result.data : [result];
    await Promise.all(
      products.map(async (product: Product) => {
        product.author = await app
          .service("users")
          .get(product.authorId, params);
      })
    );
    return context;
  };
}
