// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const user = context.params.user;
    const { data } = context;
    const authorId = data.authorId ? data.authorId : user._id;
    context.data = {
      ...data,
      authorId,
      createdBy: user._id
    };
    return context;
  };
}
