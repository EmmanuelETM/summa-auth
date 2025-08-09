import authAPI from "../../api/auth";

export async function register({ username, email, password }) {
  const [error, data] = await authAPI.register({ username, password, email });

  if (error) {
    return [error || "Invalid login", null];
  }

  return [null, data];
}

// export async function UpdatePassword({ username, email, newPassword }) {}
