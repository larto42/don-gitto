export const findOrganization = input => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${input}+type:org`
      );
      const json = await response.json();
      const { items: organizations } = json;
      const bestMatch = organizations[0].login;

      resolve(bestMatch);
    } catch (error) {
      reject(error);
    }
  });
};

export const getOrganizationUsers = organizationName => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://api.github.com/orgs/${organizationName}/members`
      );
      const json = await response.json();

      const users = json.map(user => ({
        id: user.id,
        login: user.login
      }));

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserLastActivity = user => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${user}/events`
      );
      const json = await response.json();

      resolve(json[0]);
    } catch (error) {
      reject(error);
    }
  });
};
