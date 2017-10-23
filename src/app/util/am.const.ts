export class AmConst {
  private static welcome = ['Hey :)'];
  // public
  static firstlogin = 'Please notice your masterkey for relogin!';

  // delete key
  static deleted = 'deleted';
  static undo = 'Undo';

  // export
  static exportFilePrefix = 'Please copy the whole text and save it! ****'; // **** are important
  static exportMsg = 'export'

  // import
  static importSuccess = ' items imported successfully ;)';
  static importNoImport = 'No item imported'!;
  static importError = 'Import error! File is broken or you may used other masterkey';
  static importItemsExists = ' items exist already in the list';

  // Snackbar
  static snackResetAccount = 'Do you want reset your account?';
  static snackLoginFail = 'Login failed!';
  static snackYES = 'YES!';

  // validate
  static validateMasterkey =  'Masterkey is required';
  static validate5long = 'Input has to be at least 5 characters long';
  static validateRequired = 'this is required!';
  static validateTitleRequired = 'Title is required';
  static validateUserRequired = 'Username is required';
  static validatePassRequired = 'Password is required';
  static validateTextRequired = 'Text is required';


  // changing text
  static get welcomeText() {
    return this.welcome[0];
  }
}
