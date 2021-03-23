import { useTracker } from "meteor/react-meteor-data";
import { CategoriesCollection, ICategory } from "/imports/api/categories";

type Fields = {
  [Property in keyof Partial<ICategory>]: number;
};
type Options = {
  fields?: Fields;
  sort?: Fields;
};

export function useCategories(
  selector: Mongo.Selector<ICategory>,
  options: Options = { fields: { _id: 1, name: 1, type: 1 } }
): Array<ICategory> {
  const categories = useTracker(() => {
    return CategoriesCollection.find(selector, {
      ...options,
      fields: options.fields as Mongo.FieldSpecifier,
    }).fetch();
  }, []);

  return categories;
}
