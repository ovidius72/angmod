import <%= Name %>Factory from './<%= camelCaseName %>.service';

let <%= Name %> = angular.module('<%= namespace %>',
  [])
  .factory('<%= Name %>Factory', <%= Name %>Factory);

export default <%= Name %>;
