import Event from './event/event.module';
import Locale from './locale/locale';
import Format from './formats/formats';


let HelperModule = angular.module('app.shared.services.helper', [
  Event.name,
  Locale.name,
  Format.name
]);

export default HelperModule;
