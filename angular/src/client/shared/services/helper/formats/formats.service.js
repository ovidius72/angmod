function FormatsFactory(AppSettings, $filter, LocaleFactory) {
  "ngInject";
  let factory = {};
  factory.name = 'Formats';

  let siteUrl = AppSettings.sitePath + AppSettings.basePath + AppSettings.pathPrefix;


  Drupal.behaviors.angmod = (function (context) {


  /**
   * return the web site full url
   *
   * @return     {<type>}  { description_of_the_return_value }
   */
    factory.siteUrl = () => {
      "use strict";
      return siteUrl;
    };


    /**
     * Return a plural format based on the count argument
     *
     * @param      {string}  singularString  The singular string
     * @param      {string}  pluralString    The plural string
     * @param      {<type>}  count           The count
     * @return     {<type>}  { formatted string }
     */
    factory.formatPlural = function (singularString, pluralString, count) {
      count = count || 0;
      return Drupal.formatPlural(count,
        '1 ' + singularString,
        '@count ' + pluralString);
    };

  }.bind(this))();

  return factory;
}

export default FormatsFactory;
