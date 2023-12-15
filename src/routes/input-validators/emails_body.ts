import { z } from 'zod';

export default z.object({
  body: z.object({
    to: z.string({
      required_error: 'to is required',
    }),
    subject: z.string({
      required_error: 'subject is required',
    }),
    text: z.string({
      required_error: 'text is required',
    }),
    html: z.string({
      required_error: 'html is required',
    }),
  }),
});
