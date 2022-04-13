/**
 * Makes a DELETE http request to auth-service and logs out user
 *
 * @param {*} user
 */
export const logoutHandler = async (user) => {
  console.log(user);
  const refreshTokenToDelete = {
    refreshToken: user.refreshToken,
  };
  try {
    const response = await fetch("/api/v1/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshTokenToDelete),
    });
    console.log(response);
    localStorage.removeItem("lc_ab_mb_token");
  } catch (error) {
    console.log(error);
  }
};
