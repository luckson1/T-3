import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const itemRouter= router({
    getShoppingItem:  publicProcedure.query(async ({ ctx}) => {
        const items= await ctx.prisma.shoppingItem.findMany();
        return items
      }),
      createShoppingItem: publicProcedure.input(
        z.object({
            name: z.string()
        })
      )
      .mutation( async ({input, ctx})=> {
        const {name}=input
       const item= await ctx.prisma.shoppingItem.create({
            data: {
                name,
                checked: false
            }
        })
        return item
      }),
      deleteShoppingItem:  publicProcedure.input(
        z.object({
            id: z.string()
        })
      )
      .mutation( async ({input, ctx})=> {
        const {id}=input
       const item= await ctx.prisma.shoppingItem.delete({
            where: {
               id
            }
        })
        return item
      }),
    }
      )