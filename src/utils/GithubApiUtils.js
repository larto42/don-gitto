export const findOrganization = async input => {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${input}+type:org`
    );
    const json = await response.json();

    if (json.totalCount === 0) return '';

    const { items: organizations } = json;
    const bestMatch = organizations[0].login;
    return bestMatch;
  } catch (error) {
    console.error('errrr', error);
  }
};

export const getOrganizationUsers = async organizationName => {
  try {
    const response = await fetch(
      `https://api.github.com/orgs/${organizationName}/members`
    );
    const json = await response.json();

    const users = json.map(user => ({
      id: user.id,
      login: user.login
    }));

    return users;
  } catch (error) {
    console.error(error);
  }
};

export const getUserLastActivity = async user => {
  try {
    const response = await fetch(`https://api.github.com/users/${user}/events`);
    const json = await response.json();
    return json[0]?.type || 'User has no public activity';
  } catch (error) {
    console.error(error);
  }
};
