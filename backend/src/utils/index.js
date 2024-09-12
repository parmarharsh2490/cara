export const getIndexOfVarietyAndImage = (path) => {
  const regex = /\[(\d+)\]/g;
  const matches = [];
  let match;

  // Extract all matches
  while ((match = regex.exec(path)) !== null) {
    matches.push(Number(match[1])); 
  }

  return {
    varietyIndex: matches[0] !== undefined ? matches[0] : null,
    imageIndex: matches[1] !== undefined ? matches[1] : null,
  };
};
