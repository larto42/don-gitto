import Octokit from '@octokit/rest';

export const findOrganization = async input => {
  const octokit = new Octokit();
  const response = await octokit.search.users({
    q: `${input}+type:org`
  });
  const { total_count: totalCount, items: organizations } = response.data;

  if (totalCount === 0) return null;

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
  const [activity] = activityArray;
  if (!activity) return null;

  const date = new Date(activity.created_at).toLocaleString();

  return {
    type: activity.type,
    repo: activity.repo.name,
    date: date
  };
};

export const checkLimits = async () => {
  const octokit = new Octokit();
  const limits = await octokit.rateLimit.get();
  const { core: coreLimits, search: searchLimits } = limits.data.resources;

  if (coreLimits.remaining === 0) {
    return new Date(coreLimits.reset * 1000);
  }
  if (searchLimits.remaining === 0) {
    return new Date(searchLimits.reset * 1000);
  }

  return null;
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
