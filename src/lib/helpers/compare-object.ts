export function compareObjects(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) {
  if (typeof obj1 !== 'object' || obj1 === null) return false;
  if (typeof obj2 !== 'object' || obj2 === null) return false;

  return (
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).reduce((acc, key) => acc && obj1[key] === obj2[key], true)
  );
}
