const FRONTEND_LABEL = "Frontend";
const STATUS_READY_TO_RELEASE = "11100";

/**
 * Groups an array by a given property or matching function, keeping the initial sorting.
 * @param {array} list
 * @param {string|function} selector A string identifying a property of the object in the list
 *                              or a function that returns a value for everyone of them.
 * @returns {array}
 */
export function groupBy(list, selector) {
  return list.reduce((acc, cur) => {
    const propertyKey = typeof selector === "string" ? selector : "group";
    const value = typeof selector === "string" ? cur[selector] : selector(cur);

    if (!value && value !== "") {
      return acc.concat(cur);
    }

    const group = acc.find((g) => g[propertyKey] === value);

    if (!group) {
      return acc.concat({ [propertyKey]: value, children: [cur] });
    }

    // Update the object in the accumulator
    const index = acc.indexOf(group);
    if (index !== -1) {
      acc[index].children.push(cur);
    }

    return acc;
  }, []);
}

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

// On single issue
export const getPersonName = (personObject) => personObject.displayName;
export const getCreator = (issue) => getPersonName(issue.fields.creator);
export const getStatus = (issue) => issue.fields.status.id;
export const isReadYToRelease = (issue) =>
  getStatus(issue) === STATUS_READY_TO_RELEASE;
export const getCreationDate = (issue) => issue.fields.created;
export const getTimeDistanceInDays = (issue) =>
  (new Date() - new Date(getCreationDate(issue))) / (1000 * 60 * 60 * 24);
