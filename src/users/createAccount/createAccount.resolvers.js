import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, { email, username, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (existingUser) {
          throw new Error("This Username or Email is already exist");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await client.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
          },
        });
        if (user) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not create User",
          };
        }
      } catch (error) {
        return {
          ok: false,
          error,
        };
      }
    },
  },
};
