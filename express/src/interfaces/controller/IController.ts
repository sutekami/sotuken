interface IController {
  index?(): any;
  show?(): any;
  create?(): any;
  update?(): any;
  [key: string]: any;
}
