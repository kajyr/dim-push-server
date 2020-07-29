const FRONTEND_LABEL = "Frontend";
const STATUS_READY_TO_RELEASE = "11100";

/**
 * Partition a list into two lists: [passes, non-passes] the condition function
 * @param {array} list
 * @param {function} condition a function that returns true or false
 * @returns {array}
 */
export function partition(list, condition) {
  return list.reduce(
      (result, element) => {
          result[condition(element) ? 0 : 1].push(element);
          return result;
      },
      [[], []]
  );
}

// On multiple sisues
export const filterIssuesByLabel = (issues, label) =>
  issues.filter((issue) => issue.fields.labels.includes(label));
export const getFrontendIssues = (issues) =>
    filterIssuesByLabel(issues, FRONTEND_LABEL);
  export const getIssuesPartition = (issues, condition) => partition(issues, condition)

// On single issue
export const getPersonName = (personObject) => personObject.displayName;
export const getCreator = (issue) => getPersonName(issue.fields.creator);
export const getStatus = (issue) => issue.fields.status.id;
export const isReadYToRelease = (issue) =>
  getStatus(issue) === STATUS_READY_TO_RELEASE;
export const getCreationDate = (issue) => issue.fields.created
export const getTimeDistanceInDays = (issue) =>
  (new Date() - new Date(getCreationDate(issue))) / (1000 * 60 * 60 * 24);
