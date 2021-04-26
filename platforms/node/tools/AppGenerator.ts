import Generator from "yeoman-generator";
import { basename } from "path";

module.exports = class AppGenerator extends Generator {
  constructor(args, opts, props) {
    super(args, opts);

    this.name = basename(process.cwd());
    this.props = props;
  }

  writing() {}
  delete() {}
};
