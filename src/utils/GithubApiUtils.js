import Octokit from '@octokit/rest';

export const findOrganization = async input => {
  const octokit = new Octokit();

  const response = await octokit.search.users({
    q: `${input}+type:org`
  });
  const { total_count: totalCount, items: organizations } = response.data;

  if (totalCount === 0) return '';

  const bestMatch = organizations[0].login;
  return bestMatch;
};

export const getOrganizationUsers = async organizationName => {
  const octokit = new Octokit();
  const response = await octokit.orgs.listMembers({
    org: organizationName
  });

  const { data: userArray } = response;

  const users = userArray.map(user => ({
    id: user.id,
    login: user.login
  }));

  return users;
};

export const getUserLastActivity = async user => {
  const octokit = new Octokit();
  const response = await octokit.activity.listEventsForUser({
    username: user
  });

  const { data: activityArray } = response;
  return activityArray[0]?.type || 'User has no public activity';
};
