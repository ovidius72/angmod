import <%= Name %>Component from './<%= camelCaseName %>.component';

let <%= Name %>Module = angular.module('<%= namespace %>', [
  //Add module dependencies here
  //in the format.
  /*OtherModule.name*/
])
  .directive('<%= camelCaseName %>', <%= Name %>Component);

export default <%= Name %>Module;
