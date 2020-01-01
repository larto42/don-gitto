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

export const getOrganizationUsers = async (organizationName, page) => {
  const octokit = new Octokit();
  const response = await octokit.orgs.listMembers({
    org: organizationName,
    page: page
  });

  const { data: userArray, headers } = response;
  const { link } = headers;

  const links = link ? parseLinks(link) : null;

  const users = userArray.map(user => ({
    id: user.id,
    login: user.login
  }));

  return { users, links };
};

export const getUserLastActivity = async user => {
  const octokit = new Octokit();
  const response = await octokit.activity.listEventsForUser({
    username: user
  });

  const { data: activityArray } = response;
  return activityArray[0]?.type || 'User has no public activity';
};

const parseLinks = link => {
  const linkArr = link.split(',');
  const links = linkArr.map(item => {
    const regex = /^(.*)\?page=(\d+)>; rel="(.*)"\s*$/gm;
    const results = regex.exec(item);

    if (results === null) return { pageNumber: '', label: '' };

    const [, , pageNumber, label] = results;
    return {
      pageNumber,
      label
    };
  });

  // For now we only want to show prev and next buttons
  const prevNextLinks = links.filter(
    item => item.label === 'prev' || item.label === 'next'
  );

  const finalLinks = prevNextLinks.reduce((acc, cur) => {
    acc[cur.label] = cur.pageNumber;
    return acc;
  }, {});
  return finalLinks;
};
