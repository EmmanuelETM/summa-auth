import authAPI from "../../api/auth";

export async function register({ username, email, password }) {
  const [error, data] = await authAPI.register({ username, password, email });

  if (error) {
    return [error || "Invalid login", null];
  }

  return [null, data];
}

export async function updatePassword({ username, password }) {
  const [error, data] = await authAPI.updatePassword({ username, password });

  if (error) {
    return [error || "Couldn't update password", null];
  }

  return [null, data];
}
