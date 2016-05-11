let StartFrom = angular.module('app.shared.filters.startfrom', [])
  .filter('startFrom', () => {
    "ngInject";
    return (input, start) => {
      if (input.length) {
        start = +start; //parse to int
        return input.slice(start);
      }
    };
  });

export default StartFrom;
