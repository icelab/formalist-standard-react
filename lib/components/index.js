import fields from "./fields";
import { AttrFactory } from "./attr";
import { CompoundFieldFactory } from "./compound-field";
import { GroupFactory } from "./group";
import { ManyFactory } from "./many";
import { ChildFormFactory } from "./child-form";
import { ManyFormsFactory } from "./many-forms";
import { SectionFactory } from "./section";
import { FormFieldFactory } from "./child-form-field";

export default function components() {
  var customComponents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var base = {
    fields: fields(config.fields, config.global),
    attr: AttrFactory,
    compoundField: CompoundFieldFactory,
    group: GroupFactory,
    many: ManyFactory,
    childForm: ChildFormFactory,
    manyForms: ManyFormsFactory,
    section: SectionFactory,
    formField: FormFieldFactory
  };
  return Object.assign(base, customComponents);
}