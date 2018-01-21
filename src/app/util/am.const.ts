export class AmConst {
  private static welcome = ['Hey :)', 'Good to see you agian!', 'Hi, please remember to backup.',];
  // public
  static first_login = 'Please notice your masterkey for relogin!';

  // delete key
  static deleted = ' deleted';
  static undo = 'Undo';

  // export
  static export_file_prefix = 'Please copy the whole text and save it! ****'; // **** are important
  static export_msg = 'export'

  // import
  static import_success = ' items imported successfully ;)';
  static import_nothing_imported = 'No item imported'!;
  static import_error = 'Import error! File is broken or you may used other masterkey';
  static import_items_exists = ' items exist already in the list';

  // Snackbar
  static snack_reset_account = 'Do you want reset your account?';
  static snack_login_fail = 'Login failed!';
  static snack_YES = 'YES!';

  // validate
  static validate_masterkey =  'Masterkey is required';
  static validate_5_long = 'Input has to be at least 5 characters long';
  static validate_required = 'this is required!';
  static validate_title_required = 'Title is required';
  static validate_user_required = 'Username is required';
  static validate_pass_required = 'Password is required';
  static validate_text_required = 'Text is required';

  // save
  static saved = ' saved';
  static updated = ' updated'

  // changing text
  static get welcomeText() {
    return this.welcome[this.getRandom(0, this.welcome.length)];
  }
  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  static getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (min - max) + max);
  }
}
